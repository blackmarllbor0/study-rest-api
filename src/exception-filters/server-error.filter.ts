import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerError extends HttpException {
  constructor() {
    super('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
