import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { Gender } from '../enum/gender.enum';
import { CreatePelangganDto } from './create-pelanggan.dto';

export class UpdatePelangganDto extends PartialType(CreatePelangganDto) {
    @IsString()
    nama_pelanggan: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsString()
    gender: Gender;
}
