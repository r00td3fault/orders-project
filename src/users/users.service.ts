import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './models/user.model';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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

  async register(registerUserDto: RegisterUserDto): Promise<User | null> {
    try {
      return this.userRepository.register(registerUserDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something happend registering user',
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    try {
      const user = await this.userRepository.findOne(loginUserDto.email);
      if (!user) throw new BadRequestException('Credentials failed, try again');
    } catch (error) {
      console.error(error);
    }
  }
}
