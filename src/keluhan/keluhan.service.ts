import { Injectable } from '@nestjs/common';
import { CreateKeluhanDto } from './dto/create-keluhan.dto';
import { UpdateKeluhanDto } from './dto/update-keluhan.dto';

@Injectable()
export class KeluhanService {
  create(createKeluhanDto: CreateKeluhanDto) {
    return 'This action adds a new keluhan';
  }

  findAll() {
    return `This action returns all keluhan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keluhan`;
  }

  update(id: number, updateKeluhanDto: UpdateKeluhanDto) {
    return `This action updates a #${id} keluhan`;
  }

  remove(id: number) {
    return `This action removes a #${id} keluhan`;
  }
}
