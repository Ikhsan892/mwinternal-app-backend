import { Injectable } from '@nestjs/common';
import { CreatePelangganDto } from './dto/create-pelanggan.dto';
import { UpdatePelangganDto } from './dto/update-pelanggan.dto';

@Injectable()
export class PelangganService {
  create(createPelangganDto: CreatePelangganDto) {
    return 'This action adds a new pelanggan';
  }

  findAll() {
    return `This action returns all pelanggan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pelanggan`;
  }

  update(id: number, updatePelangganDto: UpdatePelangganDto) {
    return `This action updates a #${id} pelanggan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pelanggan`;
  }
}
