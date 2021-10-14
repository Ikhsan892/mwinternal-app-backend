import { GlobalEntity } from 'src/global.entity';
import { ImageBarang } from 'src/image-barang/entities/image-barang.entity';
import { Order } from 'src/order/entities/order.entity';
import { Pelanggan } from 'src/pelanggan/entities/pelanggan.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Barang extends GlobalEntity {
  @Column()
  nama_barang: string;

  @Column()
  merk: string;

  @Column()
  spesifikasi: string;

  @Column({
    nullable: true,
  })
  jenis_barang: string;

  @Column()
  status: string;

  @Column()
  keluhan: string;

  @ManyToOne(() => Pelanggan, (cr) => cr.barang)
  pelanggan: Pelanggan;

  @ManyToOne(() => Order, (cr) => cr.barang)
  order: Order;

  @ManyToMany(() => User)
  @JoinTable()
  teknisi: User[];

  @OneToMany(() => ImageBarang, (cr) => cr.barang)
  image: ImageBarang[];
}
