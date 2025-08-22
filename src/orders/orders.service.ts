import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Order } from './models/order.model';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Order[]> {
    try {
      const defaultLimit = this.configService.get<number>('defaultLimit');
      const { limit = defaultLimit, page = 1 } = paginationDto;

      return this.orderRepository.findAll(limit!, page);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error getting all orders');
    }
  }

  async findOneById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOneById(id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order | null> {
    return this.orderRepository.create(createOrderDto);
  }

  async advanceOrder(id: string): Promise<void> {
    try {
      return await this.orderRepository.updateState(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return this.orderRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanOldOrders() {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 30);

    const deleted = await this.orderRepository.deleteCron(threshold);

    if (deleted > 0) {
      console.log(`Cleaned ${deleted} old orders`);
    }
  }
}
