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
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { User } from './users/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => {
        const throttlers: ThrottlerModuleOptions = [
          {
            name: 'short',
            ttl: configService.get<number>('APP_RATE_SHORT_TTL')!,
            limit: configService.get<number>('APP_RATE_SHORT_LIMIT')!,
          },
          {
            name: 'medium',
            ttl: configService.get<number>('APP_RATE_MEDIUM_TTL')!,
            limit: configService.get<number>('APP_RATE_MEDIUM_LIMIT')!,
          },
          {
            name: 'long',
            ttl: configService.get<number>('APP_RATE_LONG_TTL')!,
            limit: configService.get<number>('APP_RATE_LONG_LIMIT')!,
          },
        ];
        return throttlers;
      },
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
      models: [Order, OrderItem, User],
      repositoryMode: true,
      // sync: { force: true },
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
    ScheduleModule.forRoot(),
    OrdersModule,
    CommonModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
