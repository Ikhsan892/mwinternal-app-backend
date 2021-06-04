import { Injectable } from '@nestjs/common';
import { CreateImageBarangDto } from './dto/create-image-barang.dto';
import { UpdateImageBarangDto } from './dto/update-image-barang.dto';

@Injectable()
export class ImageBarangService {
  create(createImageBarangDto: CreateImageBarangDto) {
    return 'This action adds a new imageBarang';
  }

  findAll() {
    return `This action returns all imageBarang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageBarang`;
  }

  update(id: number, updateImageBarangDto: UpdateImageBarangDto) {
    return `This action updates a #${id} imageBarang`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageBarang`;
  }
}
