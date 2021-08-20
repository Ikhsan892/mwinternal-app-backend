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
    private imageService: Repository<ImageBarang>
  ) { }

  async create(createImageBarangDto: CreateImageBarangDto): Promise<any> {
    return await this.imageService.save(createImageBarangDto)
  }

  async createBulk(files: any[], barang: any): Promise<boolean> {
    try {
      files.map(async (i) => {
        let img = new ImageBarang()
        img.image_path = i.filename
        img.barang = barang;
        await this.imageService.save(img)
      })
      return true;
    } catch (err) {
      return false
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

  remove(id: number) {
    return `This action removes a #${id} imageBarang`;
  }
}
