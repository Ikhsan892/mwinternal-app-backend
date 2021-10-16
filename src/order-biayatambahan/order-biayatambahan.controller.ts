import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderBiayatambahanService } from './order-biayatambahan.service';
import { CreateOrderBiayatambahanDto } from './dto/create-order-biayatambahan.dto';
import { UpdateOrderBiayatambahanDto } from './dto/update-order-biayatambahan.dto';

@Controller('order-biayatambahan')
export class OrderBiayatambahanController {
  constructor(
    private readonly orderBiayatambahanService: OrderBiayatambahanService,
  ) {}

  @Post('selected-biaya')
  create(@Body() createOrderBiayatambahanDto: CreateOrderBiayatambahanDto) {
    return this.orderBiayatambahanService.create(createOrderBiayatambahanDto);
  }

  @Delete('delete-selected/:orderId/:nama_biaya')
  deleteBro(
    @Param('orderId') orderId: string,
    @Param('nama_biaya') nama_biaya: string,
  ) {
    return this.orderBiayatambahanService.deleteSelected(+orderId, nama_biaya);
  }

  @Get(':order')
  findAll(@Param('order') order: string) {
    return this.orderBiayatambahanService.findAll(+order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderBiayatambahanService.findOne(+id);
  }

  @Put('update-total/:nama_biaya/:orderId')
  updateTotal(
    @Param('nama_biaya') nama_biaya: string,
    @Body('total') total: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderBiayatambahanService.updateTotal(
      nama_biaya,
      +orderId,
      +total,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderBiayatambahanDto: UpdateOrderBiayatambahanDto,
  ) {
    return this.orderBiayatambahanService.update(
      +id,
      updateOrderBiayatambahanDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderBiayatambahanService.remove(+id);
  }
}
