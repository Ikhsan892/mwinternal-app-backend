import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageBarangDto } from './dto/create-image-barang.dto';
import { UpdateImageBarangDto } from './dto/update-image-barang.dto';
import { ImageBarang } from './entities/image-barang.entity';

@Injectable()
export class ImageBarangService {
  constructor(
    @InjectRepository(ImageBarang)
    private imageService: Repository<ImageBarang>,
  ) {}

  async create(createImageBarangDto: CreateImageBarangDto): Promise<any> {
    return await this.imageService.save(createImageBarangDto);
  }

  async createBulk(files: any[], barang: any): Promise<boolean> {
    try {
      files.map(async (i) => {
        let img = new ImageBarang();
        img.image_path = i.filename;
        img.barang = barang;
        await this.imageService.save(img);
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  async createProduct(files: any[], product: any): Promise<boolean> {
    try {
      files.map(async (i) => {
        let img = new ImageBarang();
        img.image_path = i.filename;
        img.product = product;
        await this.imageService.save(img);
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  async createSparepart(files: any[], sparepart: any): Promise<boolean> {
    try {
      files.map(async (i) => {
        let img = new ImageBarang();
        img.image_path = i.filename;
        img.sparepart = sparepart;
        await this.imageService.save(img);
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  findAll() {
    return `This action returns all imageBarang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageBarang`;
  }

  update(id: number, updateImageBarangDto: UpdateImageBarangDto) {
    return `This action updates a #${id} imageBarang`;
  }

  async deleteIfHidden(current_images: any[], barang: number): Promise<any> {
    try {
      current_images.map(async (i) => {
        if (i.hidden) {
          await this.imageService.softDelete(i.id);
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} imageBarang`;
  }
}
