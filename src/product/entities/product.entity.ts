import { CategoryBarang } from "src/category-barang/entities/category-barang.entity";
import { GlobalEntity } from "src/global.entity";
import { ImageBarang } from "src/image-barang/entities/image-barang.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TipeBarang } from "../enum/tipe-barang.enum";

@Entity()
export class Product extends GlobalEntity {
    @Column({
        nullable : false
    })
    nama_barang : string;

    @Column({
        nullable : false
    })
    merk_barang : string;

    @Column({
        nullable : false
    })
    tipe_barang : TipeBarang;

    @Column({
        nullable : true
    })
    deskripsi : string;

    @Column({
        nullable: false,
        default : false
    })
    disabled : boolean
    
    @Column({
        nullable : false,
        default : 0
    })
    stok : number;

    @Column({
        nullable : false,
        default : 0
    })    
    harga_beli : number;

    @Column({
        nullable : false,
        default : 0
    })
    profit : number;

    @Column({
        nullable : false,
        default : 0
    })    
    harga_jual : number;

    @OneToMany(() => ImageBarang, cr => cr.product)
    image : ImageBarang[]

    @ManyToOne(() => CategoryBarang, cr => cr.product)
    category : CategoryBarang;
}
