import { Module } from '@nestjs/common';
import { CategoryBarangService } from './category-barang.service';
import { CategoryBarangController } from './category-barang.controller';

@Module({
  controllers: [CategoryBarangController],
  providers: [CategoryBarangService]
})
export class CategoryBarangModule {}
