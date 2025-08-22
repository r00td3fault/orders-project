/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { OrdersController } from 'src/orders/orders.controller';
import { OrdersService } from 'src/orders/orders.service';
import { PaginationDto } from '../../src/common/dto/pagination.dto';

const createorderDto: CreateOrderDto = {
  clientName: 'Ana López',
  items: [
    { description: 'Ceviche', quantity: 2, unitPrice: 50 },
    { description: 'Chicha morada', quantity: 1, unitPrice: 10 },
  ],
};

const pagination: PaginationDto = {
  limit: 10,
  page: 1,
};

describe('orderController', () => {
  let orderController: OrdersController;
  let orderService: OrdersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((order: CreateOrderDto) =>
                Promise.resolve({ id: '1', ...order }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                id: '1',
                clientName: 'Ana López',
                items: [
                  { description: 'Ceviche', quantity: 2, unitPrice: 50 },
                  { description: 'Chicha morada', quantity: 1, unitPrice: 10 },
                ],
              },
              {
                id: '2',
                clientName: 'Ana López',
                items: [
                  { description: 'Ceviche', quantity: 2, unitPrice: 50 },
                  { description: 'Chicha morada', quantity: 1, unitPrice: 10 },
                ],
              },
            ]),
            findOneById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id,
                clientName: 'Ana López',
                items: [
                  { description: 'Ceviche', quantity: 2, unitPrice: 50 },
                  { description: 'Chicha morada', quantity: 1, unitPrice: 10 },
                ],
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    orderController = app.get<OrdersController>(OrdersController);
    orderService = app.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      expect(orderController.createOrder(createorderDto)).resolves.toEqual({
        id: '1',
        ...createorderDto,
      });
      expect(orderService.create).toHaveBeenCalled();
      expect(orderService.create).toHaveBeenCalledWith(createorderDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      orderController.getOrders(pagination);
      expect(orderService.findAll).toHaveBeenCalled();
      expect(orderService.findAll).toHaveBeenCalledWith(pagination);
    });
  });
});
