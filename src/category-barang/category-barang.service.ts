import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryBarangDto } from './dto/create-category-barang.dto';
import { UpdateCategoryBarangDto } from './dto/update-category-barang.dto';
import { CategoryBarang } from './entities/category-barang.entity';

@Injectable()
export class CategoryBarangService {

  constructor(
    @InjectRepository(CategoryBarang)
    private categoryService: Repository<CategoryBarang>
  ) { }

  async create(createCategoryBarangDto: CreateCategoryBarangDto): Promise<any> {
    try {
      await this.categoryService.save(createCategoryBarangDto);
      return {
        status: 201,
        message: "Success inserted category"
      }
    } catch (e) {
      return new InternalServerErrorException()
    }
  }

  async findAll(): Promise<any> {
    return await this.categoryService.find()
  }

  async findOne(id: number): Promise<any> {
    return await this.categoryService.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateCategoryBarangDto: UpdateCategoryBarangDto): Promise<any> {
    return await this.categoryService.update({ id }, updateCategoryBarangDto)
  }

  async remove(id: number): Promise<any> {
    return await this.categoryService.softDelete(id)
  }
}
