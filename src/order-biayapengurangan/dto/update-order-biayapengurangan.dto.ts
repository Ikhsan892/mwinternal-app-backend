import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderBiayapenguranganDto } from './create-order-biayapengurangan.dto';

export class UpdateOrderBiayapenguranganDto extends PartialType(CreateOrderBiayapenguranganDto) {}
