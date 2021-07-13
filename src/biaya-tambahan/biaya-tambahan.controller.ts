import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put } from '@nestjs/common';
import { BiayaTambahanService } from './biaya-tambahan.service';
import { ActiveBiayaTambahanDTO } from './dto/active-biaya-tambahan.dto';
import { CreateBiayaTambahanDto } from './dto/create-biaya-tambahan.dto';
import { DeleteBiayaTambahanDTO } from './dto/delete-biaya-tambahan.dto';
import { UpdateBiayaTambahanDto } from './dto/update-biaya-tambahan.dto';

@Controller('biaya-tambahan')
export class BiayaTambahanController {
  constructor(private readonly biayaTambahanService: BiayaTambahanService) { }

  @Post()
  create(@Body(new ValidationPipe()) createBiayaTambahanDto: CreateBiayaTambahanDto) {
    return this.biayaTambahanService.create(createBiayaTambahanDto);
  }

  @Get()
  findAll() {
    return this.biayaTambahanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biayaTambahanService.findOne(+id);
  }

  @Put()
  active(@Body(new ValidationPipe()) updatePaymentMethodDto: ActiveBiayaTambahanDTO) {
    return this.biayaTambahanService.setActive(updatePaymentMethodDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateBiayaTambahanDto: UpdateBiayaTambahanDto) {
    return this.biayaTambahanService.update(+id, updateBiayaTambahanDto);
  }

  @Delete()
  deleteMassive(@Body(new ValidationPipe()) data: DeleteBiayaTambahanDTO) {
    return this.biayaTambahanService.removeMassive(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biayaTambahanService.remove(+id);
  }
}
