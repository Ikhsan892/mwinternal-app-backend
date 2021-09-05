import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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

  @Put('')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      destination: './dist/app/files',
      filename: editFileName,
    }),
    fileFilter: exeFileFilter,
  }))
  updateBarang(@Body(new ValidationPipe()) payload: UpdateBarangDto,@UploadedFiles()
  file: Array<Express.Multer.File> ){
    return this.barangService.updateBarang(payload,file);
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
