import { CategoryBarang } from "src/category-barang/entities/category-barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Pelanggan } from "src/pelanggan/entities/pelanggan.entity";
import { Sparepart } from "src/sparepart/entities/sparepart.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

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

    @ManyToMany(() => Sparepart)
    @JoinTable()
    sparepart: Sparepart[];
}
