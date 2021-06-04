import { GlobalEntity } from "src/global.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Role extends GlobalEntity {
    @Column()
    nama_role : string;

    @OneToMany(() => User, (cr) => cr.role)
    user : User[];
}
