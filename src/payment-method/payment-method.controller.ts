import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { ActivePaymentMethodDto } from './dto/active-payment-method.dto';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  create(@Body(new ValidationPipe()) createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(+id);
  }

  @Put()
  active(@Body(new ValidationPipe()) updatePaymentMethodDto: ActivePaymentMethodDto) {
    return this.paymentMethodService.setActive(updatePaymentMethodDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(+id, updatePaymentMethodDto);
  }

  @Delete()
  deleteMassive(@Body(new ValidationPipe()) data: DeleteDTO) {
    return this.paymentMethodService.removeMassive(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
}
