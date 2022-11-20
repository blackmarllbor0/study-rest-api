import { UnauthorizedException } from '@nestjs/common';

export class AuthExeption extends UnauthorizedException {
  constructor() {
    super('Wrong credentials provided');
  }
}
