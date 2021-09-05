import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { SparepartService } from './sparepart.service';

@Controller('sparepart')
export class SparepartController {
  constructor(private readonly sparepartService: SparepartService) {}

  @Get()
  findAll() {
    return this.sparepartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sparepartService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSparepartDto: UpdateSparepartDto,
  ) {
    return this.sparepartService.update(+id, updateSparepartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sparepartService.remove(+id);
  }
}
