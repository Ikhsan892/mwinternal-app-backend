import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
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
      product.disabled = createProductDto.disabled === 'false' ? false : true;
      product.category = null;
      let _product = this.productService.save(product);
      return _product;
    }
  }

  async updateData(
    updateProductDto: UpdateProductDto,
    id: any,
  ): Promise<Product | Error> {
    try {
      let product = new Product();
      product.id = +id;
      product.nama_barang = updateProductDto.nama_barang;
      product.merk_barang = updateProductDto.merk_barang;
      product.tipe_barang = updateProductDto.tipe_barang;
      product.stok = updateProductDto.stok;
      product.harga_beli = updateProductDto.harga_beli;
      product.harga_jual = updateProductDto.harga_jual;
      product.profit = Math.round(
        +updateProductDto.harga_jual - +updateProductDto.harga_beli,
      );
      product.deskripsi = updateProductDto.deskripsi;
      product.disabled = updateProductDto.disabled === 'false' ? false : true;
      product.category = null;
      let _product = this.productService.save(product);
      return _product;
    } catch (err: any) {
      return new Error('Error while updating data');
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productService.find({
      relations: ['image'],
    });
  }

  async findActive(): Promise<Product[]> {
    let data: Product[] = await this.productService.find({
      where: {
        disabled: false,
        stok: MoreThan(0),
      },
      relations: ['image'],
    });

    return data;
  }

  db() {
    return this.productService;
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
