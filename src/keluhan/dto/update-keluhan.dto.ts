import { PartialType } from '@nestjs/mapped-types';
import { CreateKeluhanDto } from './create-keluhan.dto';

export class UpdateKeluhanDto extends PartialType(CreateKeluhanDto) {}
