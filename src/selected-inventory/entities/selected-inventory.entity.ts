import { Barang } from 'src/barang/entities/barang.entity';
import { GlobalEntity } from 'src/global.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Sparepart } from 'src/sparepart/entities/sparepart.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class SelectedInventory extends GlobalEntity {
  @ManyToOne(() => Product, (cr) => cr.selected)
  product: Product;

  @ManyToOne(() => Sparepart, (cr) => cr.selected)
  sparepart: Sparepart;

  @ManyToOne(() => Order, (cr) => cr.selected)
  order: Order;

  @Column({
    nullable: false,
    default: 0,
  })
  stok: number;

  @Column({
    nullable: false,
    default: 0,
  })
  total_harga: number;

  @Column({
    nullable: false,
  })
  tipe_barang: string;
}
