import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import process from 'process';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user) {
    const payload = user;
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt_token_secret'),
      expiresIn: this.configService.get('jwt_token_expire'),
    });
  }

  verify(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('jwt_token_secret'),
    });
  }
}
