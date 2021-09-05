import { IsString } from 'class-validator';
import { TipeBarang } from 'src/product/enum/tipe-barang.enum';

export class CreateInventoryDto {
  @IsString()
  nama_barang: string;

  @IsString()
  merk_barang: string;

  @IsString()
  tipe_barang: TipeBarang;

  @IsString()
  disabled: boolean;

  @IsString()
  spesifikasi_barang: string;

  @IsString()
  stok: number;

  @IsString()
  harga_beli: number;

  @IsString()
  harga_jual: number;

  @IsString()
  deskripsi: string;
}
