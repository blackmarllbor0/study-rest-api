import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PostgresErrorCode } from 'src/database/postgres-error.code';
import { AuthExeption } from 'src/exception-filters/auth.filter';
import { ServerError } from 'src/exception-filters/server-error.filter';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ITokenPaylad } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * creates a new user if the service passes all checks
   * @param dto { CreateUserDto } data transfer object
   * @returns { User }
   */
  public async register(dto: CreateUserDto): Promise<User> {
    const hashPassword = await hash(dto.password, 10);
    try {
      const user = await this.userService.create({
        ...dto,
        password: hashPassword,
      });
      return { ...user, password: undefined };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with what email already exist');
      }
      throw new ServerError();
    }
  }

  /**
   * checks the similarity of passwords (text and hashed)
   * and, if unsuccessful, informs about it
   * @param textPass {string} text password
   * @param hashPass {string} encrypted password
   */
  private async verifyPassword(
    textPass: string,
    hashPass: string,
  ): Promise<void> {
    const isPasswordMathing = await compare(textPass, hashPass);
    if (!isPasswordMathing) {
      throw new AuthExeption();
    }
  }

  /**
   * checks that the data is correct
   * returns either the error or the user
   * @param email {string} search mail
   * @param textPass {string} entered password
   * @returns { User }
   */
  public async getAuthUser(email: string, textPass: string): Promise<User> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(textPass, user.password);
      return user;
    } catch (error) {
      throw new AuthExeption();
    }
  }

  /**
   * creates a string to write to the cookie
   * as a token accepts the user's id
   * @param userId {string}
   * @returns string
   */
  public getCookieWithJwtToken(userId: number): string {
    const payload: ITokenPaylad = { userId };
    const token = this.jwtService.sign(payload);
    const time = this.configService.get('JWT_EXP_TIME');
    return this.createCookieString(token, time);
  }

  /**
   * clear the exit cookie
   * @returns {string}
   */
  public getCookieForLogOut(): string {
    return this.createCookieString();
  }

  /**
   * returns a cookie strin, depending on
   * what you want to do with it
   * @param token {string} user token
   * @param time {number} token live time
   * @returns {string}
   */
  private createCookieString(token: string = null, time: number = 0): string {
    return `Authentication=${token};HttpOnly;Path=/;Max-Age=${time}`;
  }
}
