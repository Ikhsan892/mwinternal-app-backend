import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderBiayatambahanDto } from './create-order-biayatambahan.dto';

export class UpdateOrderBiayatambahanDto extends PartialType(CreateOrderBiayatambahanDto) {}
