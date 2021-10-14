import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectedInventoryDto } from './create-selected-inventory.dto';

export class UpdateSelectedInventoryDto extends PartialType(CreateSelectedInventoryDto) {}
