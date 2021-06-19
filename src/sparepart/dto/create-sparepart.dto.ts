import { IsNumber, IsString } from "class-validator";

export class CreateSparepartDto {
    @IsString()
    nama_sparepart: string;

    @IsString()
    merk_hp: string;

    @IsString()
    tipe_hp: string;

    @IsString()
    stok: string;

    @IsNumber()
    harga: number;

    @IsNumber()
    category: any;

}
