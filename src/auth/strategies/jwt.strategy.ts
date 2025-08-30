import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtPayloadType } from '../types/jwtPayload.types';
import { User } from 'src/users/models/user.model';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('secretToken')!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: jwtPayloadType): Promise<Partial<User>> {
    const { sub: userId } = payload;

    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new UnauthorizedException(`Bad credentials try again`);

    return user;
  }
}
