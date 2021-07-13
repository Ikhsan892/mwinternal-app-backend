import { GlobalEntity } from "src/global.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class BiayaTambahan extends GlobalEntity {

    @Column({
        nullable: false
    })
    nama_biaya: string;

    @Column({
        nullable: false
    })
    biaya_ditaksir: number;

    @Column({
        nullable: false
    })
    is_utama: boolean;

}
