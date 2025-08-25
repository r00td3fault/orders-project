import { Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from './types/user-repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private sequelize: Sequelize,
  ) {}
  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email,
        isActive: true,
      },
    });
  }
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    return await this.sequelize.transaction(async (t) => {
      const user = await this.userModel.create(
        {
          firstName: registerUserDto.firstName,
          lastName: registerUserDto.lastName,
          email: registerUserDto.email,
          password: registerUserDto.password,
        },
        { transaction: t },
      );

      return user;
    });
  }
}
