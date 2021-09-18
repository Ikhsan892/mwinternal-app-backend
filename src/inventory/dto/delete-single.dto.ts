import { IsNumber, IsString } from 'class-validator';
import { TipeBarang } from 'src/product/enum/tipe-barang.enum';

export class DeleteSingleDTO {
  @IsNumber()
  id: number;

  @IsString()
  tipe_barang: TipeBarang;
}
