import { GlobalEntity } from "src/global.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Order } from "src/order/entities/order.entity";
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

    @OneToMany(() => Order, cr => cr.pengiriman)
    order: Order[];
}
