import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageBarangService } from 'src/image-barang/image-barang.service';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { SparepartService } from 'src/sparepart/sparepart.service';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { Barang } from './entities/barang.entity';

@Injectable()
export class BarangService {

  constructor(
    @InjectRepository(Barang)
    private barangService: Repository<Barang>,
    private userService: UserService,
    private imageService: ImageBarangService,
  ) { }

  async create(createBarangDto: CreateBarangDto, files: any): Promise<any> {
    // find duplicate barang with pelanggan
    let find_duplicate_barang_pelanggan = await this.barangService.find({
      where: {
        pelanggan: createBarangDto.pelanggan,
        nama_barang: createBarangDto.nama_barang
      }
    })
    if (find_duplicate_barang_pelanggan.length > 0) {
      return {
        status: 403,
        message: "This items has same items and directly same with the customer"
      }
    } else {

      let teknisis = createBarangDto.teknisi.split(',').map((i) => parseInt(i))

      let find_teknisi = await this.userService.db().find({
        where: {
          id: In(teknisis)
        }
      })

      let barang = new Barang()
      barang.keluhan = createBarangDto.keluhan
      barang.merk = createBarangDto.merk
      barang.nama_barang = createBarangDto.nama_barang
      barang.order = createBarangDto.order
      barang.jenis_barang = createBarangDto.jenis_barang
      barang.pelanggan = createBarangDto.pelanggan
      barang.spesifikasi = createBarangDto.spesifikasi
      barang.status = createBarangDto.status
      barang.teknisi = find_teknisi;
      let data = await this.barangService.save(barang)

      if (files.length > 0) {
        await this.imageService.createBulk(files, data.id)
      }

    }
    return {
      status: 201,
      message: "Success Insert Barang"
    }
  }

  findAll() {
    return `This action returns all barang`;
  }

  async findOne(id: number): Promise<Barang> {
    return await this.barangService.findOne({
      where: {
        id: id
      },
      relations: ['teknisi', 'image']
    })
  }

  update(id: number, updateBarangDto: UpdateBarangDto) {
    return `This action updates a #${id} barang`;
  }

  remove(id: number) {
    return `This action removes a #${id} barang`;
  }

  async removeMassive(data: DeleteDTO): Promise<any> {
    data.id.map(async (i) => {
      await this.barangService.softDelete(i);
    });
    return data;
  }

}
