import { PartialType } from '@nestjs/mapped-types';
import { CreateKerusakanDto } from './create-kerusakan.dto';

export class UpdateKerusakanDto extends PartialType(CreateKerusakanDto) {}
