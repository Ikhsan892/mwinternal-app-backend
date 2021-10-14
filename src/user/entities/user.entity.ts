import { Barang } from 'src/barang/entities/barang.entity';
import { GlobalEntity } from 'src/global.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class User extends GlobalEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  refresh_token: string;

  @Column()
  profile_path: string;

  @ManyToOne(() => Role, (cr) => cr.user)
  role: Role;

  @OneToMany(() => Barang, (cr) => cr.teknisi)
  teknisi: Barang[];
}
