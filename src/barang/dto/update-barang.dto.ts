import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateBarangDto } from './create-barang.dto';

export class UpdateBarangDto extends PartialType(CreateBarangDto) {
    @IsString()
    id : string;

    @IsString()
    images : string;
}
