import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryDto } from 'src/inventory/dto/create-inventory.dto';
import { Repository } from 'typeorm';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { Sparepart } from './entities/sparepart.entity';

@Injectable()
export class SparepartService {
  constructor(
    @InjectRepository(Sparepart)
    private sparepartService: Repository<Sparepart>,
  ) {}

  async create(
    createSparepartDto: CreateInventoryDto,
  ): Promise<Sparepart | Error> {
    let find_duplicate = await this.sparepartService.findOne({
      where: {
        nama_barang: createSparepartDto.nama_barang,
        merk_barang: createSparepartDto.merk_barang,
      },
    });
    if (find_duplicate) {
      return new Error('Sparepart sudah ada');
    } else {
      let sparepart = new Sparepart();
      sparepart.nama_barang = createSparepartDto.nama_barang;
      sparepart.merk_barang = createSparepartDto.merk_barang;
      sparepart.tipe_barang = createSparepartDto.tipe_barang;
      sparepart.stok = createSparepartDto.stok;
      sparepart.harga_beli = createSparepartDto.harga_beli;
      sparepart.harga_jual = createSparepartDto.harga_jual;
      sparepart.deskripsi = createSparepartDto.deskripsi;
      sparepart.disabled =
        createSparepartDto.disabled === 'true' ? true : false;
      sparepart.category = null;
      return await this.sparepartService.save(sparepart);
    }
  }

  async findAll(): Promise<any> {
    return await this.sparepartService.find({
      relations: ['image'],
    });
  }

  async findOne(id: number): Promise<any> {
    return await this.sparepartService.findOne({
      where: { id },
    });
  }

  async findBulk(data: number[]): Promise<any> {
    return await this.sparepartService.findByIds(data);
  }

  // Connector DB
  db() {
    return this.sparepartService;
  }

  async update(
    id: number,
    updateSparepartDto: UpdateSparepartDto,
  ): Promise<any> {
    // return await this.sparepartService.update({ id }, updateSparepartDto)
  }

  async remove(id: number): Promise<any> {
    return await this.sparepartService.softDelete(id);
  }
}
