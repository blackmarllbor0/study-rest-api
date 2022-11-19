import { IsEmail, IsNumberString } from 'class-validator';

export class FindOneParamById {
  @IsNumberString()
  public id: number;
}

export class FindOneParamByEmail {
  @IsEmail()
  public email: string;
}
