import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateBiayaTambahanDto } from './create-biaya-tambahan.dto';

export class UpdateBiayaTambahanDto extends PartialType(CreateBiayaTambahanDto) {

    @IsString()
    nama_biaya: string;

    @IsNumber()
    biaya_ditaksir: number;

}
