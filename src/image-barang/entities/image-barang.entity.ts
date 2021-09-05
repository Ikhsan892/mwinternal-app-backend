import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Product } from "src/product/entities/product.entity";
import { Sparepart } from "src/sparepart/entities/sparepart.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ImageBarang extends GlobalEntity{
    @Column()
    image_path : string;

    @ManyToOne(() => Barang, cr => cr.image)
    barang : Barang;

    @ManyToOne(() => Product, cr => cr.image)
    product : Product;

    @ManyToOne(() => Sparepart, cr => cr.image)
    sparepart : Sparepart
}
