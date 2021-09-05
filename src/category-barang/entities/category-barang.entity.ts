import { GlobalEntity } from "src/global.entity";
import { Product } from "src/product/entities/product.entity";
import { Sparepart } from "src/sparepart/entities/sparepart.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class CategoryBarang extends GlobalEntity {
    @Column()
    nama_category: string;

    // @OneToMany(() => Barang, cr => cr.category)
    // barang : Barang[]

    @OneToMany(() => Sparepart, cr => cr.category)
    sparepart: Sparepart[]

    @OneToMany(() => Product, cr => cr.category)
    product: Product[]
};
