import { CategoryBarang } from 'src/category-barang/entities/category-barang.entity';
import { GlobalEntity } from 'src/global.entity';
import { ImageBarang } from 'src/image-barang/entities/image-barang.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Sparepart extends GlobalEntity {
  @Column({
    nullable: false,
  })
  nama_barang: string;

  @Column({
    nullable: false,
  })
  merk_barang: string;

  /**
   * IOS | ANDROID | WINDOWS
   */
  @Column({
    nullable: true,
  })
  spesifikasi_barang: string;

  @Column({
    nullable: true,
    default: false,
  })
  deskripsi: string;

  @Column({
    nullable: false,
    default: false,
  })
  disabled: boolean;

  @Column({
    nullable: false,
    default: 0,
  })
  stok: number;

  @Column({
    nullable: false,
    default: 0,
  })
  harga_beli: number;

  @Column({
    nullable: false,
    default: 0,
  })
  harga_jual: number;

  @ManyToOne(() => CategoryBarang, (cr) => cr.sparepart)
  category: CategoryBarang;

  @OneToMany(() => ImageBarang, (cr) => cr.sparepart)
  image: ImageBarang[];
}
