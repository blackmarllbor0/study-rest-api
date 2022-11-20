import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<User> {
    return await this.authService.register(dto);
  }
}
