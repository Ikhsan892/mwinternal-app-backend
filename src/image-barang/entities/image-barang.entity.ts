import { Barang } from "src/barang/entities/barang.entity";
import { GlobalEntity } from "src/global.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ImageBarang extends GlobalEntity{
    @Column()
    image_path : string;

    @ManyToOne(() => Barang, cr => cr.image)
    barang : Barang;
}
