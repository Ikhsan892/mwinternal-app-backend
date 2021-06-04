import { GlobalEntity } from "src/global.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity()
export class PaymentMethod extends GlobalEntity {
    @Column()
    name_payment : string;

    @Column()
    image_path : string;

    @OneToMany(() => Invoice, cr => cr.payment)
    invoice : Invoice[];
}
