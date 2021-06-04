import { Module } from '@nestjs/common';
import { ImageBarangService } from './image-barang.service';
import { ImageBarangController } from './image-barang.controller';

@Module({
  controllers: [ImageBarangController],
  providers: [ImageBarangService]
})
export class ImageBarangModule {}
