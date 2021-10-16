import { Barang } from 'src/barang/entities/barang.entity';
import { GlobalEntity } from 'src/global.entity';
import { OrderBiayaPengurangan } from 'src/order-biayapengurangan/entities/order-biayapengurangan.entity';
import { OrderBiayaTambahan } from 'src/order-biayatambahan/entities/order-biayatambahan.entity';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import { Pelanggan } from 'src/pelanggan/entities/pelanggan.entity';
import { Pengiriman } from 'src/pengiriman/entities/pengiriman.entity';
import { Product } from 'src/product/entities/product.entity';
import { SelectedInventory } from 'src/selected-inventory/entities/selected-inventory.entity';
import { Sparepart } from 'src/sparepart/entities/sparepart.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Order extends GlobalEntity {
  @ManyToOne(() => PaymentMethod, (cr) => cr.order)
  payment: PaymentMethod;

  @ManyToOne(() => Pengiriman, (cr) => cr.order)
  pengiriman: Pengiriman;

  @ManyToOne(() => Pelanggan, (cr) => cr.order)
  pelanggan: Pelanggan;

  @Column({
    nullable: false,
  })
  status: string;

  @Column({
    nullable: true,
  })
  garansi: string;

  @Column({
    nullable: true,
  })
  year: number;

  @Column({
    nullable: true,
  })
  tipe: TipeOrderan;

  @Column({
    nullable: true,
  })
  month: number;

  @Column({
    nullable: false,
  })
  tanggal_invoice: Date;

  @Column({
    nullable: true,
    default: 0,
  })
  dp: number;

  @Column({
    nullable: true,
    default: 0,
  })
  total: number;

  @Column({
    nullable: false,
  })
  no_invoice: string;

  @OneToMany(() => Barang, (cr) => cr.order)
  barang: Barang[];

  @OneToMany(() => SelectedInventory, (cr) => cr.order)
  selected: SelectedInventory[];

  @OneToMany(() => OrderBiayaTambahan, (cr) => cr.order)
  order_biaya: OrderBiayaTambahan[];

  @OneToMany(() => OrderBiayaPengurangan, (cr) => cr.order)
  order_diskon: OrderBiayaPengurangan[];

  @ManyToMany(() => Product)
  @JoinTable()
  product: Product[];

  @ManyToMany(() => Sparepart)
  @JoinTable()
  sparepart: Sparepart[];
}
