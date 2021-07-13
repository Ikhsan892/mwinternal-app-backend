import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { PelangganService } from './pelanggan.service';
import { CreatePelangganDto } from './dto/create-pelanggan.dto';
import { UpdatePelangganDto } from './dto/update-pelanggan.dto';
import { DeleteDTO } from './dto/delete-massive.dto';

@Controller('pelanggan')
export class PelangganController {
  constructor(private readonly pelangganService: PelangganService) { }

  @Post()
  create(@Body() createPelangganDto: CreatePelangganDto) {
    return this.pelangganService.create(createPelangganDto);
  }

  @Post('/mock')
  create_mock() {
    return this.pelangganService.insertMany();
  }

  @Get()
  findAll() {
    return this.pelangganService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pelangganService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePelangganDto: UpdatePelangganDto) {
    return this.pelangganService.update(+id, updatePelangganDto);
  }

  @Delete('bulk')
  deleteMassive(@Body() data: DeleteDTO) {
    return this.pelangganService.removeMassive(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pelangganService.remove(+id);
  }
}
