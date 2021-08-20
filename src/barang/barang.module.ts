import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageBarangModule } from 'src/image-barang/image-barang.module';
import { SparepartModule } from 'src/sparepart/sparepart.module';
import { UserModule } from 'src/user/user.module';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';
import { Barang } from './entities/barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barang]), SparepartModule, UserModule, ImageBarangModule],
  controllers: [BarangController],
  providers: [BarangService],
  exports: [BarangService]
})
export class BarangModule { }
