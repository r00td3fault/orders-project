import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@ApiSchema({ name: 'RegisterUserRequest' })
export class RegisterUserDto {
  @ApiProperty({ example: 'Pedro', description: 'User firstname' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'gomez perez', description: 'User lastname' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'user@mail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'mysecurepassword', description: 'User password' })
  @IsString()
  @IsStrongPassword()
  password: string;
}
