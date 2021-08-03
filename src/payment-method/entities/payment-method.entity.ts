import { GlobalEntity } from "src/global.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity()
export class PaymentMethod extends GlobalEntity {
    @Column()
    name_payment: string;

    @Column({
        nullable: true
    })
    image_path: string;

    @Column({
        default: false
    })
    aktif: Boolean;

    @OneToMany(() => Invoice, cr => cr.payment)
    invoice: Invoice[];

    @OneToMany(() => Order, cr => cr.payment)
    order: Order[];
}
