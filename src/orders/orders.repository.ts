import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersRepositoryInterface } from './types/oders-repository.interface';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Order } from './models/order.model';
import { OrderItem } from './models/order-item.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderState } from './types/order.types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class OrdersRepository implements OrdersRepositoryInterface {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(OrderItem)
    private orderItemModel: typeof OrderItem,
    private sequelize: Sequelize,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOneById(id: string): Promise<Order | null> {
    return this.orderModel.findOne({
      where: {
        isActive: true,
        id,
      },
      include: [
        {
          model: this.sequelize.models.OrderItem,
          required: false,
        },
      ],
    });
  }

  async findAll(limit: number, page: number): Promise<Order[]> {
    const cacheKey = `orders:${page}:${limit}`;
    const offset = (page - 1) * limit;

    const cachedOrders = await this.cacheManager.get<Order[]>(cacheKey);

    if (cachedOrders?.length) {
      console.log('Hit de cache');
      return cachedOrders;
    }

    // TODO Wrapp response with only specific data (interface)
    const orders = await this.orderModel.findAll({
      where: {
        [Op.and]: [
          { isActive: true },
          { state: { [Op.ne]: orderState.delivered } },
        ],
      },
      include: [
        {
          model: this.sequelize.models.OrderItem,
          required: false,
        },
      ],
      offset,
      limit,
    });

    await this.cacheManager.set(cacheKey, orders);

    return orders;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
    try {
      const { items, ...orderData } = createOrderDto;

      return await this.sequelize.transaction(async (t) => {
        const order = await this.orderModel.create(
          {
            clientName: orderData.clientName,
            isActive: orderData.isActive ?? true,
            state: orderState.initiated,
          },
          { transaction: t },
        );

        if (items?.length) {
          const orderItems = items.map((item) => ({
            ...item,
            orderId: order.id,
          }));

          await this.orderItemModel.bulkCreate(orderItems, { transaction: t });
        }

        // TODO Wrapp response with only specific data (interface)
        return await this.orderModel.findByPk(order.id, {
          include: [this.sequelize.models.OrderItem],
          transaction: t,
        });
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating Order');
    }
  }

  async updateState(id: string): Promise<void> {
    const order = await this.findOneById(id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    const newState: orderState =
      (order?.state as orderState) === orderState.initiated
        ? orderState.sent
        : orderState.delivered;

    await this.sequelize.transaction(async (t) => {
      await order?.update(
        {
          state: newState,
        },
        {
          transaction: t,
        },
      );

      if ((order?.state as orderState) === orderState.delivered) {
        //TODO define specific logic to cahce managed
        // get all posible keys
        const cachedOrders = await this.cacheManager.get<Order[]>('orders:*:*');

        if (cachedOrders?.length) {
          const newCachedOrders = cachedOrders.filter(
            (order) => order.id !== id,
          );
          await this.cacheManager.del('orders:*');
          await this.cacheManager.set('orders:', newCachedOrders);
        }
        //TODO DELETE FROM CACHE
        await order?.update(
          {
            isActive: false,
          },
          {
            transaction: t,
          },
        );
      }
    });
  }

  async delete(id: string): Promise<void> {
    const order = await this.findOneById(id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    await order?.update({
      isActive: false,
    });
  }

  async deleteCron(threshold: Date): Promise<number> {
    return await this.orderModel.destroy({
      where: { createdAt: { $lt: threshold } as any },
    });
  }
}
