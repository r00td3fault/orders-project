import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from 'src/orders/orders.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, OrdersModule, AuthModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
