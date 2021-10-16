import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderBiayapenguranganDto } from './dto/create-order-biayapengurangan.dto';
import { UpdateOrderBiayapenguranganDto } from './dto/update-order-biayapengurangan.dto';
import { OrderBiayapenguranganService } from './order-biayapengurangan.service';

@Controller('order-biayapengurangan')
export class OrderBiayapenguranganController {
  constructor(
    private readonly orderBiayapenguranganService: OrderBiayapenguranganService,
  ) {}

  @Post('selected-biaya')
  create(@Body() createOrderBiayatambahanDto: CreateOrderBiayapenguranganDto) {
    return this.orderBiayapenguranganService.create(
      createOrderBiayatambahanDto,
    );
  }

  @Delete('delete-selected/:orderId/:nama_biaya')
  deleteBro(
    @Param('orderId') orderId: string,
    @Param('nama_biaya') nama_biaya: string,
  ) {
    return this.orderBiayapenguranganService.deleteSelected(
      +orderId,
      nama_biaya,
    );
  }

  @Get(':order')
  findAll(@Param('order') order: string) {
    return this.orderBiayapenguranganService.findAll(+order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderBiayapenguranganService.findOne(+id);
  }

  @Put('update-total/:nama_biaya/:orderId')
  updateTotal(
    @Param('nama_biaya') nama_biaya: string,
    @Body('total') total: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderBiayapenguranganService.updateTotal(
      nama_biaya,
      +orderId,
      +total,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderBiayatambahanDto: UpdateOrderBiayapenguranganDto,
  ) {
    return this.orderBiayapenguranganService.update(
      +id,
      updateOrderBiayatambahanDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderBiayapenguranganService.remove(+id);
  }
}
