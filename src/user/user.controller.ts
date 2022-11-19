import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import {
  FindOneParamByEmail,
  FindOneParamById,
} from 'src/utils/find-one-param';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  public async getById(@Param() { id }: FindOneParamById): Promise<User> {
    return await this.userService.getById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getByEmail/:email')
  public async getByEmail(
    @Param() { email }: FindOneParamByEmail,
  ): Promise<User> {
    return await this.userService.getByEmail(email);
  }
}
