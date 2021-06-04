import { Injectable } from '@nestjs/common';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';

@Injectable()
export class SparepartService {
  create(createSparepartDto: CreateSparepartDto) {
    return 'This action adds a new sparepart';
  }

  findAll() {
    return `This action returns all sparepart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sparepart`;
  }

  update(id: number, updateSparepartDto: UpdateSparepartDto) {
    return `This action updates a #${id} sparepart`;
  }

  remove(id: number) {
    return `This action removes a #${id} sparepart`;
  }
}
