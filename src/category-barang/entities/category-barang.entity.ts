import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Sparepart } from "src/sparepart/entities/sparepart.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class CategoryBarang extends GlobalEntity {
    @Column()
    nama_category: string;

    // @OneToMany(() => Barang, cr => cr.category)
    // barang : Barang[]

    @OneToMany(() => Sparepart, cr => cr.category)
    sparepart: Sparepart[]
};
