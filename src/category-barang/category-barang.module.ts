import { Module } from '@nestjs/common';
import { CategoryBarangService } from './category-barang.service';
import { CategoryBarangController } from './category-barang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryBarang } from './entities/category-barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryBarang])],
  controllers: [CategoryBarangController],
  providers: [CategoryBarangService]
})
export class CategoryBarangModule { }
