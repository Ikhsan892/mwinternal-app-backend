import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productService: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product | Error> {
    let find_duplicate = await this.productService.findOne({
      where: {
        nama_barang: createProductDto.nama_barang,
        merk_barang: createProductDto.merk_barang,
      },
    });
    if (find_duplicate) {
      return new Error('barang sudah ada');
    } else {
      let product = new Product();
      product.nama_barang = createProductDto.nama_barang;
      product.merk_barang = createProductDto.merk_barang;
      product.tipe_barang = createProductDto.tipe_barang;
      product.stok = createProductDto.stok;
      product.harga_beli = createProductDto.harga_beli;
      product.harga_jual = createProductDto.harga_jual;
      product.profit = Math.round(
        +createProductDto.harga_jual - +createProductDto.harga_beli,
      );
      product.deskripsi = createProductDto.deskripsi;
      product.disabled = createProductDto.disabled;
      product.category = null;
      let _product = this.productService.save(product);
      return _product;
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
