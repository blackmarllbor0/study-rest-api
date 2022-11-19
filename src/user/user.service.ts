import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundById } from 'src/exception-filters/not-found-by-id.filter';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * searching for user by the passed id
   * @param id { number } id to search by
   * @returns { User }
   */
  public async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new NotFoundById('user', id);
  }

  /**
   * searching for user by the passed email
   * @param email { string } email to search by
   * @returns { User }
   */
  public async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new NotFoundException(
      `Nothing was found for this email - user/${email}`,
    );
  }

  /**
   * created a new user
   * @param user { CreateUserDto } data transfer object
   * @returns { User }
   */
  public async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }
}
