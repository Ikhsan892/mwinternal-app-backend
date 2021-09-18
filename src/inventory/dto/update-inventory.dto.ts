import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @IsString()
  id: string;

  @IsString()
  images: string;
}
