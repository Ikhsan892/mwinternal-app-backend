import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateSparepartDto } from './create-sparepart.dto';

export class UpdateSparepartDto extends PartialType(CreateSparepartDto) {
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
