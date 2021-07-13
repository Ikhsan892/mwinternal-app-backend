import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreatePengirimanDto } from './create-pengiriman.dto';

export class UpdatePengirimanDto extends PartialType(CreatePengirimanDto) {
    @IsString()
    nama_pengiriman: string;

    @IsString()
    aktif: string;
}
