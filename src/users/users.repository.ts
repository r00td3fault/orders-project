import { Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from './types/oders-repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Sequelize } from 'sequelize';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private sequelize: Sequelize,
  ) {}
  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }
  register(registerUserDto: RegisterUserDto): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
