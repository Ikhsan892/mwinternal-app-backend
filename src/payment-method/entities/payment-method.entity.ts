import { GlobalEntity } from "src/global.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class PaymentMethod extends GlobalEntity {
    @Column()
    name_payment : string;

    @Column()
    image_path : string;
}
