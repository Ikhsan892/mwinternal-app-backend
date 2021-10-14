import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { TipeBarang } from 'src/product/enum/tipe-barang.enum';
import { Sparepart } from 'src/sparepart/entities/sparepart.entity';

export class CreateSelectedInventoryDto {
  product?: any;
  sparepart?: any;
  order: any;
  stok: number;
  total_harga: number;
  tipe_barang: TipeBarang;
}
