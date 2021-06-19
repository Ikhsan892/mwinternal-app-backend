import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SparepartService } from 'src/sparepart/sparepart.service';
import { randomString } from 'src/utils';
import { getManager, Repository } from 'typeorm';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { Barang } from './entities/barang.entity';

@Injectable()
export class BarangService {

  constructor(
    @InjectRepository(Barang)
    private barangService: Repository<Barang>,
    private sparepartService: SparepartService
  ) { }

  async create(createBarangDto: CreateBarangDto): Promise<any> {
    // find sparepart first
    let found_sparepart = await this.sparepartService.findBulk(createBarangDto.spareparts)

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
      const barang = new Barang()
      createBarangDto.ref = randomString(6);
      barang.sparepart = found_sparepart;
      await this.barangService.save({ ...createBarangDto, ...barang })
    }
    return {
      status: 201,
      message: "Success Inserting Barang"
    }
  }

  findAll() {
    return `This action returns all barang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barang`;
  }

  update(id: number, updateBarangDto: UpdateBarangDto) {
    return `This action updates a #${id} barang`;
  }

  remove(id: number) {
    return `This action removes a #${id} barang`;
  }
}
