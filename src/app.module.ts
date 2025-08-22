import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OrdersModule } from './orders/orders.module';
import { CommonModule } from './common/common.module';
import { EnvValidationSchema } from './config/env-validation.schema';
import { EnvConfiguration } from './config/env.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { Order } from './orders/models/order.model';
import { OrderItem } from './orders/models/order-item.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: Boolean(process.env.DB_SYNC),
      models: [Order, OrderItem],
      repositoryMode: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('CACHE_HOST'),
            port: configService.get<number>('CACHE_PORT'),
          },
          ttl: configService.get<number>('CACHE_TTL'),
        });

        return { store };
      },
    }),
    OrdersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
