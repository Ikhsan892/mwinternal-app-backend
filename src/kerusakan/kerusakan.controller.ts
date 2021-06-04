import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KerusakanService } from './kerusakan.service';
import { CreateKerusakanDto } from './dto/create-kerusakan.dto';
import { UpdateKerusakanDto } from './dto/update-kerusakan.dto';

@Controller('kerusakan')
export class KerusakanController {
  constructor(private readonly kerusakanService: KerusakanService) {}

  @Post()
  create(@Body() createKerusakanDto: CreateKerusakanDto) {
    return this.kerusakanService.create(createKerusakanDto);
  }

  @Get()
  findAll() {
    return this.kerusakanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kerusakanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKerusakanDto: UpdateKerusakanDto) {
    return this.kerusakanService.update(+id, updateKerusakanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kerusakanService.remove(+id);
  }
}
