import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { editFileName, exeFileFilter } from 'src/utils';
import { ActivePaymentMethodDto } from './dto/active-payment-method.dto';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethodService } from './payment-method.service';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) { }


  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './dist/app/files',
      filename: editFileName,
    }),
    fileFilter: exeFileFilter,
  }))
  create(@Body(new ValidationPipe()) createPaymentMethodDto: CreatePaymentMethodDto, @UploadedFile()
  file: Express.Multer.File,) {
    return this.paymentMethodService.create(createPaymentMethodDto, file);
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
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './dist/app/files',
      filename: editFileName,
    }),
    fileFilter: exeFileFilter,
  }))
  update(@Param('id') id: string, @Body(new ValidationPipe()) updatePaymentMethodDto: UpdatePaymentMethodDto, @UploadedFile()
  file: Express.Multer.File,) {
    return this.paymentMethodService.update(+id, updatePaymentMethodDto, file);
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
