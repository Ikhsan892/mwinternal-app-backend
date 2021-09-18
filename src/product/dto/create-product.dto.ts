import { TipeBarang } from '../enum/tipe-barang.enum';

export class CreateProductDto {
  nama_barang: string;
  merk_barang: string;
  tipe_barang: TipeBarang;
  deskripsi: string;
  disabled: string;
  stok: number;
  harga_beli: number;
  harga_jual: number;
}
