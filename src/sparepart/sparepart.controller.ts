import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SparepartService } from './sparepart.service';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';

@Controller('sparepart')
export class SparepartController {
  constructor(private readonly sparepartService: SparepartService) {}

  @Post()
  create(@Body() createSparepartDto: CreateSparepartDto) {
    return this.sparepartService.create(createSparepartDto);
  }

  @Get()
  findAll() {
    return this.sparepartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sparepartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSparepartDto: UpdateSparepartDto) {
    return this.sparepartService.update(+id, updateSparepartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sparepartService.remove(+id);
  }
}
