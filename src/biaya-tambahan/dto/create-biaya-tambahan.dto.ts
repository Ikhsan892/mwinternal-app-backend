import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateBiayaTambahanDto {
    @IsString()
    nama_biaya: string;

    @IsBoolean()
    is_utama: boolean;

    @IsNumber()
    biaya_ditaksir: number;
}
