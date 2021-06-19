import { IsEmail, IsString } from "class-validator";
import { Gender } from "../enum/gender.enum";

export class CreatePelangganDto {
    @IsString()
    nama_depan: string;

    @IsString()
    nama_belakang: string;

    @IsEmail()
    email: string;

    @IsString()
    no_telepon: string;

    @IsString()
    alamat: string;

    @IsString()
    gender: Gender;

    @IsString()
    umur: string;

    @IsString()
    negara: string;

    @IsString()
    provinsi: string;

    @IsString()
    kota_kabupaten: string;

    @IsString()
    kecamatan: string;
}
