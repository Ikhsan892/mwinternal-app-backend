import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Gender } from "../enum/gender.enum";

@Entity()
export class Pelanggan extends GlobalEntity {
    @Column()
    nama_pelanggan : string;

    @Column()
    email : string;

    @Column()
    phone : string;

    @Column()
    address : string;

    @Column()
    gender : Gender;

    @OneToMany(() => Barang, cr => cr.pelanggan)
    barang : Barang[]

    @OneToMany(() => Invoice, cr => cr.pelanggan)
    invoice : Invoice[];
    
}
