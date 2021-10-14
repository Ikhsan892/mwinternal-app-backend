import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh_token'),
      secretOrKey: 'makersware_refresh_token',
      passReqToCallback: true,
    });
  }

  //   async validate(request: Request, payload: any) {
  //     const refreshToken = request.cookies?.Refresh;
  //     return this.userService.getUserIfRefreshTokenMatches(
  //       refreshToken,
  //       payload.userId,
  //     );
  //   }
}
