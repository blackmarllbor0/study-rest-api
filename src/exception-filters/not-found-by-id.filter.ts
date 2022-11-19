import { NotFoundException } from '@nestjs/common';

export class NotFoundById extends NotFoundException {
  constructor(name: string, id: number) {
    super(`Nothing was found for this id - ${name}/${id}`);
  }
}
