import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeluhanService } from './keluhan.service';
import { CreateKeluhanDto } from './dto/create-keluhan.dto';
import { UpdateKeluhanDto } from './dto/update-keluhan.dto';

@Controller('keluhan')
export class KeluhanController {
  constructor(private readonly keluhanService: KeluhanService) {}

  @Post()
  create(@Body() createKeluhanDto: CreateKeluhanDto) {
    return this.keluhanService.create(createKeluhanDto);
  }

  @Get()
  findAll() {
    return this.keluhanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keluhanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeluhanDto: UpdateKeluhanDto) {
    return this.keluhanService.update(+id, updateKeluhanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keluhanService.remove(+id);
  }
}
