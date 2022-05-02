import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayloadModel } from '../models/token-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.WEBSERVICE_JWT_SECRET,
    });
  }

  async validate<TRole>(payload: TokenPayloadModel<TRole>): Promise<TokenPayloadModel<TRole>> {
    return payload;
  }
}
