import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { PelangganModule } from 'src/pelanggan/pelanggan.module';
import { ProductModule } from 'src/product/product.module';
import { SparepartModule } from 'src/sparepart/sparepart.module';
import { SelectedInventoryModule } from 'src/selected-inventory/selected-inventory.module';
import { PaymentMethodModule } from 'src/payment-method/payment-method.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PelangganModule,
    ProductModule,
    PaymentMethodModule,
    SparepartModule,
    SelectedInventoryModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
