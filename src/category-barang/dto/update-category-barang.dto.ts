import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateCategoryBarangDto } from './create-category-barang.dto';

export class UpdateCategoryBarangDto extends PartialType(CreateCategoryBarangDto) {
    @IsString()
    nama_category: string;
}
