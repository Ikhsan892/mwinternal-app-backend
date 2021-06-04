import { Injectable } from '@nestjs/common';
import { CreateCategoryBarangDto } from './dto/create-category-barang.dto';
import { UpdateCategoryBarangDto } from './dto/update-category-barang.dto';

@Injectable()
export class CategoryBarangService {
  create(createCategoryBarangDto: CreateCategoryBarangDto) {
    return 'This action adds a new categoryBarang';
  }

  findAll() {
    return `This action returns all categoryBarang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryBarang`;
  }

  update(id: number, updateCategoryBarangDto: UpdateCategoryBarangDto) {
    return `This action updates a #${id} categoryBarang`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryBarang`;
  }
}
