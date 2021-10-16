import { GlobalEntity } from 'src/global.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class OrderBiayaTambahan extends GlobalEntity {
  @ManyToOne(() => Order, (cr) => cr.order_biaya)
  order: Order;

  @Column({
    nullable: false,
  })
  nama_biaya: string;

  @Column({
    nullable: false,
    default: 0,
  })
  total: number;
}
