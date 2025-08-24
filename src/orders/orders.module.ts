import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { OrderItem } from './models/order-item.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  imports: [
    ConfigModule,
    AuthModule,
    UsersModule,
    SequelizeModule.forFeature([Order, OrderItem]),
  ],
})
export class OrdersModule {}
