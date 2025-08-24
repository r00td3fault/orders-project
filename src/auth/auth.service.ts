import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';

import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.usersService.findOne(loginUserDto.email);
    if (!user) throw new UnauthorizedException(`Bad credentials try again`);

    const isPaswwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPaswwordMatch)
      throw new UnauthorizedException(`Bad credentials try again`);

    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerUserdto: RegisterUserDto): Promise<ResponseUserDto> {
    return this.usersService.register(registerUserdto);
  }
}
