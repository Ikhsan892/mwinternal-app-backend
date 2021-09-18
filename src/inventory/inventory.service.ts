import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ProductService } from 'src/product/product.service';
import { ImageBarangService } from 'src/image-barang/image-barang.service';
import { SparepartService } from 'src/sparepart/sparepart.service';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { TipeBarang } from 'src/product/enum/tipe-barang.enum';
import { Sparepart } from 'src/sparepart/entities/sparepart.entity';
import { Product } from 'src/product/entities/product.entity';
import { DeleteSingleDTO } from './dto/delete-single.dto';

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

  async updateData(
    updateInventory: UpdateInventoryDto,
    files: Array<Express.Multer.File>,
  ): Promise<{ status: any; message: any }> {
    let current_images = JSON.parse(updateInventory.images);
    await this.imageService.deleteIfHidden(current_images, 0);
    switch (updateInventory.tipe_barang) {
      case 'accessories':
        let acc = await this.productService.updateData(
          updateInventory,
          updateInventory.id,
        );
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
        let spr = await this.sparepartService.updateData(
          updateInventory,
          updateInventory.id,
        );
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
        let prod = await this.productService.updateData(
          updateInventory,
          updateInventory.id,
        );
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

  async findAll(): Promise<any> {
    let products = await this.productService.findAll();
    let spareparts = await this.sparepartService.findAll();
    return products.concat(spareparts);
  }

  async findOne(
    nama_barang: string,
    tipe_barang: string,
  ): Promise<Sparepart | Product> {
    if (
      tipe_barang === TipeBarang.ACCESSORIES ||
      tipe_barang === TipeBarang.PRODUK
    ) {
      return await this.productService.db().findOne({
        where: {
          nama_barang: nama_barang,
        },
        relations: ['image'],
      });
    } else if (tipe_barang === TipeBarang.SPAREPART) {
      return await this.sparepartService.db().findOne({
        where: {
          nama_barang: nama_barang,
        },
        relations: ['image'],
      });
    }
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  async remove(deleteInventoryDto: DeleteDTO): Promise<void> {
    deleteInventoryDto.id.map(async (data) => {
      let { id, tipe_barang } = JSON.parse(data);
      if (tipe_barang === TipeBarang.SPAREPART) {
        await this.sparepartService.db().softDelete(id);
      } else if (
        tipe_barang === TipeBarang.PRODUK ||
        tipe_barang === TipeBarang.ACCESSORIES
      ) {
        await this.productService.db().softDelete(id);
      }
    });
  }

  async removeOne(
    deleteInventoryDto: DeleteSingleDTO,
  ): Promise<{ deleted: boolean; data: any }> {
    try {
      let { id, tipe_barang } = deleteInventoryDto;
      let query_delete;
      if (tipe_barang === TipeBarang.SPAREPART) {
        query_delete = await this.sparepartService.db().softDelete(id);
      } else if (
        tipe_barang === TipeBarang.PRODUK ||
        tipe_barang === TipeBarang.ACCESSORIES
      ) {
        query_delete = await this.productService.db().softDelete(id);
      }

      return {
        deleted: true,
        data: query_delete,
      };
    } catch (error: any) {
      return { deleted: false, data: error.message };
    }
  }
}
