import { Module } from '@nestjs/common';
import { ImageBarangService } from './image-barang.service';
import { ImageBarangController } from './image-barang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageBarang } from './entities/image-barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageBarang])],
  controllers: [ImageBarangController],
  providers: [ImageBarangService],
  exports: [ImageBarangService]
})
export class ImageBarangModule { }
