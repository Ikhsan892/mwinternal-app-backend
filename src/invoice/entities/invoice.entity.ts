import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { PaymentMethod } from "src/payment-method/entities/payment-method.entity";
import { Pelanggan } from "src/pelanggan/entities/pelanggan.entity";
import { Pengiriman } from "src/pengiriman/entities/pengiriman.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Invoice extends GlobalEntity {
    // @ManyToOne(() => Barang, cr => cr.invoice)
    // barang : Barang;

    @Column()
    payment_status: string;

    @ManyToOne(() => PaymentMethod, cr => cr.invoice)
    payment: PaymentMethod;

    @Column()
    jasa: number;

    @Column()
    total: number;

    /**
     * Untuk nominal waktu garansi
     */
    @Column()
    garansi_length: number;

    /**
     * garansi per bulan , minggu ,tahun
     */
    @Column()
    garansi_due: string;

    @ManyToOne(() => Pengiriman, cr => cr.invoice)
    pengiriman: Pengiriman;

    @ManyToOne(() => Pelanggan, cr => cr.invoice)
    pelanggan: Pelanggan;

    @Column()
    dp: number;

    @Column()
    ongkir: number;

    @Column()
    diskon: number;
}
