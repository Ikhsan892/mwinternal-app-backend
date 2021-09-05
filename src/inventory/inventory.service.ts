import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ProductService } from 'src/product/product.service';
import { ImageBarangService } from 'src/image-barang/image-barang.service';
import { SparepartService } from 'src/sparepart/sparepart.service';

@Injectable()
export class InventoryService {
  constructor(
    private productService: ProductService,
    private imageService: ImageBarangService,
    private sparepartService: SparepartService,
  ) {}
  async create(
    createInventoryDto: CreateInventoryDto,
    files: Array<Express.Multer.File>,
  ): Promise<{ status: any; message: any }> {
    switch (createInventoryDto.tipe_barang) {
      case 'accessories':
        let acc = await this.productService.create(createInventoryDto);
        if (acc instanceof Error) {
          return {
            status: HttpStatus.CONFLICT,
            message: acc.message,
          };
        } else {
          if (files.length > 0) {
            await this.imageService.createProduct(files, acc.id);
          }
          return {
            status: HttpStatus.OK,
            message: 'Succes Insert inventory Accessories',
          };
        }

      case 'sparepart':
        let spr = await this.sparepartService.create(createInventoryDto);
        if (spr instanceof Error) {
          return {
            status: HttpStatus.CONFLICT,
            message: spr.message,
          };
        } else {
          if (files.length > 0) {
            await this.imageService.createSparepart(files, spr.id);
          }
          return {
            status: HttpStatus.OK,
            message: 'Succes Insert inventory Sparepart',
          };
        }

      case 'produk':
        let prod = await this.productService.create(createInventoryDto);
        if (prod instanceof Error) {
          return {
            status: HttpStatus.CONFLICT,
            message: prod.message,
          };
        } else {
          if (files.length > 0) {
            await this.imageService.createProduct(files, prod.id);
          }
          return {
            status: HttpStatus.OK,
            message: 'Succes Insert inventory Accessories',
          };
        }

      default:
        return {
          status: HttpStatus.FORBIDDEN,
          message: 'Undefined tipe_barang',
        };
    }
  }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
