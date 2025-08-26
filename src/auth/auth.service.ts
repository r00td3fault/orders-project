import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { LoginResponse } from './dto/login-response.dto';
import { jwtPayloadType } from './types/jwtPayload.type';

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

    const payload: jwtPayloadType = { sub: user.id };

    const token = await this.getJwtToken(payload);

    return {
      access_token: token,
    };
  }

  async register(registerUserdto: RegisterUserDto): Promise<ResponseUserDto> {
    return this.usersService.register(registerUserdto);
  }

  private async getJwtToken(payload: jwtPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
