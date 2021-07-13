import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { PengirimanService } from './pengiriman.service';
import { CreatePengirimanDto } from './dto/create-pengiriman.dto';
import { UpdatePengirimanDto } from './dto/update-pengiriman.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, exeFileFilter } from 'src/utils';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { ActivePengirimanDto } from './dto/active-pengiriman.dto';

@Controller('pengiriman')
export class PengirimanController {
  constructor(private readonly pengirimanService: PengirimanService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './dist/app/files',
      filename: editFileName,
    }),
    fileFilter: exeFileFilter,
  }))
  create(@Body(new ValidationPipe()) createPengirimanDto: CreatePengirimanDto, @UploadedFile()
  file: Express.Multer.File) {
    return this.pengirimanService.create(createPengirimanDto, file);
  }

  @Put()
  active(@Body(new ValidationPipe()) UpdatePengirimanDto: ActivePengirimanDto) {
    return this.pengirimanService.setActive(UpdatePengirimanDto);
  }

  @Get()
  findAll() {
    return this.pengirimanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengirimanService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './dist/app/files',
      filename: editFileName,
    }),
    fileFilter: exeFileFilter,
  }))
  update(@Param('id') id: string, @Body(new ValidationPipe()) updatePengirimanDto: UpdatePengirimanDto, @UploadedFile() file: Express.Multer.File) {
    return this.pengirimanService.update(+id, updatePengirimanDto, file);
  }

  @Delete()
  deleteMassive(@Body(new ValidationPipe()) data: DeleteDTO) {
    return this.pengirimanService.removeMassive(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengirimanService.remove(+id);
  }
}
