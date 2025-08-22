import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';

describe('Orders', () => {
  let app: INestApplication;
  const ordersService = {
    findAll: () => [
      {
        id: '4ab10bc4-f94c-4a73-bc03-44c43afecbad',
        clientName: 'Ana López',
        items: [
          { description: 'Ceviche', quantity: 2, unitPrice: 50 },
          { description: 'Chicha morada', quantity: 1, unitPrice: 10 },
        ],
      },
    ],
  };

  //TODO mock other dependencys
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OrdersModule],
    })
      .overrideProvider(OrdersService)
      .useValue(ordersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET Orders`, () => {
    return request(app.getHttpServer()).get('/orders').expect(200).expect({
      data: ordersService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
