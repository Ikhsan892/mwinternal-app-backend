import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Gender } from "../enum/gender.enum";

@Entity()
export class Pelanggan extends GlobalEntity {
    @Column()
    nama_depan: string;

    @Column()
    nama_belakang: string;

    @Column()
    email: string;

    @Column()
    no_telepon: string;

    @Column()
    alamat: string;

    @Column()
    gender: string;

    @Column()
    umur: string;

    @Column()
    negara: string;

    @Column()
    provinsi: string;

    @Column()
    kota_kabupaten: string;

    @Column()
    kecamatan: string;

    @OneToMany(() => Barang, cr => cr.pelanggan)
    barang: Barang[];

    @OneToMany(() => Invoice, cr => cr.pelanggan)
    invoice: Invoice[];

}
