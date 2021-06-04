import { PartialType } from '@nestjs/mapped-types';
import { CreateImageBarangDto } from './create-image-barang.dto';

export class UpdateImageBarangDto extends PartialType(CreateImageBarangDto) {}
