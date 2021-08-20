import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Kerusakan extends GlobalEntity {
    @Column()
    nama_kerusakan: string;

    // @ManyToOne(() => Barang, cr => cr.kerusakan)
    // barang : Barang;
}
