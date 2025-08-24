import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, SequelizeModule.forFeature([User])],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
