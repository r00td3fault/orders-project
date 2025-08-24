import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './models/user.model';

/**
 * Maps an User
 * @param user
 * @returns
 */
export const userMapper = (user: User): ResponseUserDto => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};
