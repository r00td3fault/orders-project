import { User } from '../models/user.model';
import { RegisterUserDto } from '../dto/register-user.dto';

export interface UsersRepositoryInterface {
  findOneById(id: string): Promise<User | null>;
  findOne(email: string): Promise<User | null>;
  register(registerUserDto: RegisterUserDto): Promise<User>;
}
