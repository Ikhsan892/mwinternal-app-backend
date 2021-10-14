import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelectedInventoryService } from './selected-inventory.service';
import { CreateSelectedInventoryDto } from './dto/create-selected-inventory.dto';
import { UpdateSelectedInventoryDto } from './dto/update-selected-inventory.dto';

@Controller('selected-inventory')
export class SelectedInventoryController {
  constructor(private readonly selectedInventoryService: SelectedInventoryService) {}

  @Post()
  create(@Body() createSelectedInventoryDto: CreateSelectedInventoryDto) {
    return this.selectedInventoryService.create(createSelectedInventoryDto);
  }

  @Get()
  findAll() {
    return this.selectedInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectedInventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelectedInventoryDto: UpdateSelectedInventoryDto) {
    return this.selectedInventoryService.update(+id, updateSelectedInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectedInventoryService.remove(+id);
  }
}
