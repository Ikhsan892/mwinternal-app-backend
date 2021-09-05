import { Module } from '@nestjs/common';
import { ImageBarangModule } from 'src/image-barang/image-barang.module';
import { ProductModule } from 'src/product/product.module';
import { SparepartModule } from 'src/sparepart/sparepart.module';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  imports: [ProductModule, ImageBarangModule, SparepartModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
