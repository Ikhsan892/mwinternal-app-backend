import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageBarangService } from './image-barang.service';
import { CreateImageBarangDto } from './dto/create-image-barang.dto';
import { UpdateImageBarangDto } from './dto/update-image-barang.dto';

@Controller('image-barang')
export class ImageBarangController {
  constructor(private readonly imageBarangService: ImageBarangService) {}

  @Post()
  create(@Body() createImageBarangDto: CreateImageBarangDto) {
    return this.imageBarangService.create(createImageBarangDto);
  }

  @Get()
  findAll() {
    return this.imageBarangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageBarangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageBarangDto: UpdateImageBarangDto) {
    return this.imageBarangService.update(+id, updateImageBarangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageBarangService.remove(+id);
  }
}
