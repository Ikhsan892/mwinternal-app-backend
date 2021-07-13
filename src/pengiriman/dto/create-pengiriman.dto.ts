import { IsBoolean, IsString } from "class-validator";

export class CreatePengirimanDto {

    @IsString()
    nama_pengiriman: string;

    @IsString()
    aktif: string;
}
