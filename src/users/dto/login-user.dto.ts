import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@ApiSchema({ name: 'LoginUserRequest' })
export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'mysecurepassword', description: 'User password' })
  @IsString()
  password: string;
}
