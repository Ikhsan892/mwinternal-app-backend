
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PelangganModule } from './pelanggan/pelanggan.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { BarangModule } from './barang/barang.module';
import { CategoryBarangModule } from './category-barang/category-barang.module';
import { SparepartModule } from './sparepart/sparepart.module';
import { KerusakanModule } from './kerusakan/kerusakan.module';
import { KeluhanModule } from './keluhan/keluhan.module';
import { ImageBarangModule } from './image-barang/image-barang.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { BiayaTambahanModule } from './biaya-tambahan/biaya-tambahan.module';
import { PengirimanModule } from './pengiriman/pengiriman.module';
import { MenuModule } from './menu/menu.module';

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
      entities: ["dist/**/*.entity{.ts,.js}"],
      logging: true,
      synchronize: false
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
    MenuModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
