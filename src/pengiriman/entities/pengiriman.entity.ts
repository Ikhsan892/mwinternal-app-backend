import { GlobalEntity } from "src/global.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Pengiriman extends GlobalEntity {
    @Column({
        nullable: false
    })
    nama_pengiriman: string;

    @Column({
        nullable: false
    })
    image_path: string;

    @Column({
        nullable: false
    })
    aktif: boolean;

    @OneToMany(() => Invoice, cr => cr.pengiriman)
    invoice: Invoice;
}
