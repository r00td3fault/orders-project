import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrdersModule } from './orders/orders.module';
import { CommonModule } from './common/common.module';
import { EnvValidationSchema } from './config/env-validation.schema';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
    }),
    OrdersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
