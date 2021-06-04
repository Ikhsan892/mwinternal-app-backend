import { Injectable } from '@nestjs/common';
import { CreateKerusakanDto } from './dto/create-kerusakan.dto';
import { UpdateKerusakanDto } from './dto/update-kerusakan.dto';

@Injectable()
export class KerusakanService {
  create(createKerusakanDto: CreateKerusakanDto) {
    return 'This action adds a new kerusakan';
  }

  findAll() {
    return `This action returns all kerusakan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kerusakan`;
  }

  update(id: number, updateKerusakanDto: UpdateKerusakanDto) {
    return `This action updates a #${id} kerusakan`;
  }

  remove(id: number) {
    return `This action removes a #${id} kerusakan`;
  }
}
