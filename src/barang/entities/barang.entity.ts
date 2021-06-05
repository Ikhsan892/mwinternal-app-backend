import { CategoryBarang } from "src/category-barang/entities/category-barang.entity";
import { GlobalEntity } from "src/global.entity";
import { ImageBarang } from "src/image-barang/entities/image-barang.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Keluhan } from "src/keluhan/entities/keluhan.entity";
import { Kerusakan } from "src/kerusakan/entities/kerusakan.entity";
import { Pelanggan } from "src/pelanggan/entities/pelanggan.entity";
import { Sparepart } from "src/sparepart/entities/sparepart.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Barang extends GlobalEntity {
    @Column()
    nama_barang : string;

    @Column()
    merk_hp : string;

    @Column()
    tipe_hp  :string;

    @Column()
    status : string;

    @ManyToOne(() => Pelanggan, cr => cr.barang)
    pelanggan : Pelanggan;

    @ManyToOne(() => User, cr => cr.created_by)
    created_by : User;

    @ManyToOne(() => User, cr => cr.teknisi)
    teknisi : User;

    @ManyToOne(() => User, cr => cr.admin)
    admin : User;

    @ManyToOne(() => CategoryBarang, cr => cr.barang)
    category : CategoryBarang;

    // Many to Many
    @ManyToMany(() => Sparepart)
    @JoinTable()
    sparepart: Sparepart[];

    @OneToMany(() => Kerusakan, cr => cr.barang)
    kerusakan : Kerusakan[];

    @OneToMany(() => Keluhan, cr => cr.barang)
    keluhan : Keluhan[]; 

    @OneToMany(() => ImageBarang, cr => cr.barang)
    image : ImageBarang[] 

    @OneToMany(() => Invoice, cr => cr.barang)
    invoice : Invoice[]
}
