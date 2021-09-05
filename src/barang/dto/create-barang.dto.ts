import { IsString } from "class-validator";

export class CreateBarangDto {
    @IsString()
    nama_barang: string;

    @IsString()
    spesifikasi: string;

    @IsString()
    merk: string;

    @IsString()
    jenis_barang: string

    @IsString()
    status: string;


    @IsString()
    keluhan: string

    pelanggan: any
    teknisi: any
    order: any;

}
