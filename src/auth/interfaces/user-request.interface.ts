import { Request } from 'express';
import { User } from 'src/user/user.entity';

export interface IRequestUser extends Request {
  user: User;
}
