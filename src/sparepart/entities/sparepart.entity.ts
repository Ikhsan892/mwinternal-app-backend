import { CategoryBarang } from "src/category-barang/entities/category-barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Sparepart extends GlobalEntity {
    @Column()
    nama_sparepart : string;

    @Column()
    merk_hp : string;

    @Column()
    tipe_hp : string;
    
    @Column()
    stok : string;

    @Column()
    harga : number;

    @ManyToOne(() => CategoryBarang, cr => cr.sparepart)
    category : CategoryBarang;
}
