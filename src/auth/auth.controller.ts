import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { IRequestUser } from './interfaces/user-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<User> {
    return await this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Req() { user, res }: IRequestUser): Promise<User> {
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    return user;
  }
}
