import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PostgresErrorCode } from 'src/database/postgres-error.code';
import { ServerError } from 'src/exception-filters/server-error.filter';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async register(dto: CreateUserDto) {
    const hashPassword = await hash(dto.password, 10);
    try {
      return await this.userService.create({ ...dto, password: hashPassword });
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        //
      }
      throw new ServerError();
    }
  }
}
