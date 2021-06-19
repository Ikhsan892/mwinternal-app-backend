import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateBarangDto {
    ref: string;

    @IsArray()
    spareparts: number[];

    @IsString()
    nama_barang: string;

    @IsString()
    tipe_hp: string;

    @IsString()
    merk_hp: string;

    @IsString()
    status: string;

    @IsNumber()
    pelanggan: any

    @IsNumber()
    created_by: any

    @IsNumber()
    teknisi: any

    @IsNumber()
    admin: any

    @IsNumber()
    category: any
}
