import { GlobalEntity } from "src/global.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Pengiriman extends GlobalEntity{
    @Column()
    nama_pengiriman : string;

    @Column()
    image_path : string;

    @OneToMany(() => Invoice, cr => cr.pengiriman)
    invoice : Invoice;
}
