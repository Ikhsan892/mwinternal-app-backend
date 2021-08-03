import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { PaymentMethod } from "src/payment-method/entities/payment-method.entity";
import { Pelanggan } from "src/pelanggan/entities/pelanggan.entity";
import { Pengiriman } from "src/pengiriman/entities/pengiriman.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Order extends GlobalEntity {

    @ManyToOne(() => PaymentMethod, cr => cr.order)
    payment: PaymentMethod;

    @ManyToOne(() => Pengiriman, cr => cr.order)
    pengiriman: Pengiriman;

    @ManyToOne(() => Pelanggan, cr => cr.order)
    pelanggan: Pelanggan;

    @Column({
        nullable: false,
    })
    status: string;

    @Column({
        nullable: false
    })
    tanggal_invoice: Date

    @Column({
        nullable: false
    })
    no_invoice: string;
}
