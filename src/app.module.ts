import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BarangModule } from './barang/barang.module';
import { BiayaTambahanModule } from './biaya-tambahan/biaya-tambahan.module';
import { CategoryBarangModule } from './category-barang/category-barang.module';
import { ImageBarangModule } from './image-barang/image-barang.module';
import { InventoryModule } from './inventory/inventory.module';
import { InvoiceModule } from './invoice/invoice.module';
import { KeluhanModule } from './keluhan/keluhan.module';
import { KerusakanModule } from './kerusakan/kerusakan.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PelangganModule } from './pelanggan/pelanggan.module';
import { PengirimanModule } from './pengiriman/pengiriman.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { SparepartModule } from './sparepart/sparepart.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'makersware_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true,
    }),
    PelangganModule,
    PaymentMethodModule,
    BarangModule,
    CategoryBarangModule,
    SparepartModule,
    KerusakanModule,
    KeluhanModule,
    PengirimanModule,
    ImageBarangModule,
    InvoiceModule,
    AuthModule,
    BiayaTambahanModule,
    MulterModule.register({
      dest: './upload',
    }),
    MenuModule,
    OrderModule,
    ProductModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
