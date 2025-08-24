import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './models/user.model';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { userMapper } from './users.mapper';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findOne(email: string): Promise<User | null> {
    try {
      return this.userRepository.findOne(email);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something happend finding user');
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findOne(registerUserDto.email);

      if (user)
        throw new ConflictException(
          `User with email ${registerUserDto.email} already exists`,
        );

      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

      const registerUser: RegisterUserDto = {
        ...registerUserDto,
        password: hashedPassword,
      };

      const newUser = await this.userRepository.register(registerUser);
      return userMapper(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something happend registering user',
      );
    }
  }
}
