import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparepartModule } from 'src/sparepart/sparepart.module';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';
import { Barang } from './entities/barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barang]), SparepartModule],
  controllers: [BarangController],
  providers: [BarangService],
  exports: [BarangService]
})
export class BarangModule { }
