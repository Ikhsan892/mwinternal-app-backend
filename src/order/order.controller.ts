import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post('selected-product')
  async selectedProduct(
    @Body() selectedProduct: any,
    @Res() response: Response,
  ) {
    let product = await this.orderService.joinSelectedProduct(selectedProduct);
    if (product instanceof Error) {
      return response
        .status(400)
        .json({ error: true, message: product.message });
    } else {
      return response.status(200).json({ error: false, message: product });
    }
  }

  @Post('selected-sparepart')
  async selectedSparepart(
    @Body() selectedSparepart: any,
    @Res() response: Response,
  ) {
    let sparepart = await this.orderService.joinSelectedSparepart(
      selectedSparepart,
    );
    if (sparepart instanceof Error) {
      return response
        .status(400)
        .json({ error: true, message: sparepart.message });
    } else {
      return response.status(200).json({ error: false, message: sparepart });
    }
  }

  @Put('/update-selected/:id/:stok/:total')
  changeStokSelected(
    @Param('id') id: string,
    @Param('stok') stok: string,
    @Param('total') total: string,
  ) {
    return this.orderService.changeStoks(+id, +stok, +total);
  }

  @Put('/update-status/:id')
  updateStatusOrderan(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateStatus(status, +id);
  }
  @Put('/payment/:id')
  updatePayment(@Param('id') id: string, @Body('payment') payment: string) {
    return this.orderService.updatePayment(+payment, +id);
  }

  @Put('/garansi/:id')
  updateGaransi(@Param('id') id: string, @Body('garansi') garansi: string) {
    return this.orderService.updateGaransi(garansi, +id);
  }

  @Put('/shipping/:id')
  updateShipping(@Param('id') id: string, @Body('shipping') shipping: string) {
    return this.orderService.updateShippingMethod(+shipping, +id);
  }

  @Put('total/:id')
  updateTotal(@Param('id') id: string, @Body('total') total: string) {
    return this.orderService.updateTotal(+id, +total);
  }

  @Put('dp/:id')
  updateDP(@Param('id') id: string, @Body('dp') dp: string) {
    return this.orderService.updateDPS(+id, +dp);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/selected/:id')
  async findSelected(@Param('id') id: string) {
    return this.orderService.findSelected(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.orderService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete()
  deleteMany(@Body(new ValidationPipe()) payload: DeleteDTO) {
    return this.orderService.removeMassive(payload);
  }

  @Delete('/delete-selected/:order/:id')
  deleteSelected(@Param('order') order: string, @Param('id') id: string) {
    return this.orderService.deleteSelectedInventory(+order, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
