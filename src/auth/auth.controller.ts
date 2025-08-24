import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LoginResponse } from './dto/login-response.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user to get token',
  })
  @ApiOkResponse({
    description: 'Success and return de token',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({
    summary: 'Register user',
  })
  @ApiCreatedResponse({
    description: 'user registered',
    type: ResponseUserDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() registerUserdto: RegisterUserDto,
  ): Promise<ResponseUserDto> {
    return this.authService.register(registerUserdto);
  }
}
