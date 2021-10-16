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
import { PengirimanModule } from 'src/pengiriman/pengiriman.module';
import { OrderBiayatambahanModule } from 'src/order-biayatambahan/order-biayatambahan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PelangganModule,
    ProductModule,
    PaymentMethodModule,
    PengirimanModule,
    OrderBiayatambahanModule,
    SparepartModule,
    SelectedInventoryModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
