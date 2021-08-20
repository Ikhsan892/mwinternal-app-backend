import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { editFileName, exeFileFilter } from 'src/utils';
import { BarangService } from './barang.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      destination: './dist/app/files',
      filename: editFileName,
    }),
    fileFilter: exeFileFilter,
  }))
  create(@Body(new ValidationPipe()) createBarangDto: CreateBarangDto, @UploadedFiles()
  file: Array<Express.Multer.File>) {
    return this.barangService.create(createBarangDto, file);
  }

  @Get()
  findAll() {
    return this.barangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarangDto: UpdateBarangDto) {
    return this.barangService.update(+id, updateBarangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barangService.remove(+id);
  }

  @Delete()
  removeMassive(@Body(new ValidationPipe()) payload: DeleteDTO) {
    return this.barangService.removeMassive(payload);
  }
}
