import { GlobalEntity } from "src/global.entity";
import { Menu } from "src/menu/entities/menu.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Role extends GlobalEntity {
    @Column()
    nama_role: string;

    @OneToMany(() => User, (cr) => cr.role)
    user: User[];

    @ManyToMany(() => Menu)
    @JoinTable()
    menu: Menu[];
}
