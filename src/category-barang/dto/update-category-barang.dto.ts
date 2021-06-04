import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryBarangDto } from './create-category-barang.dto';

export class UpdateCategoryBarangDto extends PartialType(CreateCategoryBarangDto) {}
