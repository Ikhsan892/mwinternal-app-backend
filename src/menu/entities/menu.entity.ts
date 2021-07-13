import { GlobalEntity } from "src/global.entity";
import { Column, Entity } from 'typeorm';

@Entity()
export class Menu extends GlobalEntity {
    @Column({
        nullable: false
    })
    nama_menu: string;

    @Column({
        nullable: false
    })
    link: string;
}
