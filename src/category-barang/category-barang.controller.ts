import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryBarangService } from './category-barang.service';
import { CreateCategoryBarangDto } from './dto/create-category-barang.dto';
import { UpdateCategoryBarangDto } from './dto/update-category-barang.dto';

@Controller('category-barang')
export class CategoryBarangController {
  constructor(private readonly categoryBarangService: CategoryBarangService) {}

  @Post()
  create(@Body() createCategoryBarangDto: CreateCategoryBarangDto) {
    return this.categoryBarangService.create(createCategoryBarangDto);
  }

  @Get()
  findAll() {
    return this.categoryBarangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryBarangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryBarangDto: UpdateCategoryBarangDto) {
    return this.categoryBarangService.update(+id, updateCategoryBarangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryBarangService.remove(+id);
  }
}
