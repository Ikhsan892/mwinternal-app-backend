import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Keluhan extends GlobalEntity {
    @Column()
    isi_keluhan : string;

    @ManyToOne(() => Barang, cr => cr.keluhan)
    barang : Barang;
}
