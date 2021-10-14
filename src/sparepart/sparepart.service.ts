import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryDto } from 'src/inventory/dto/create-inventory.dto';
import { UpdateInventoryDto } from 'src/inventory/dto/update-inventory.dto';
import { MoreThan, Repository } from 'typeorm';
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
      sparepart.spesifikasi_barang = createSparepartDto.spesifikasi_barang;
      sparepart.disabled =
        createSparepartDto.disabled === 'true' ? true : false;
      sparepart.category = null;
      return await this.sparepartService.save(sparepart);
    }
  }

  async updateData(
    updateSparepartDto: UpdateInventoryDto,
    id: any,
  ): Promise<Sparepart | Error> {
    try {
      let sparepart = new Sparepart();
      sparepart.id = +id;
      sparepart.nama_barang = updateSparepartDto.nama_barang;
      sparepart.merk_barang = updateSparepartDto.merk_barang;
      sparepart.tipe_barang = updateSparepartDto.tipe_barang;
      sparepart.stok = updateSparepartDto.stok;
      sparepart.harga_beli = updateSparepartDto.harga_beli;
      sparepart.harga_jual = updateSparepartDto.harga_jual;
      sparepart.deskripsi = updateSparepartDto.deskripsi;
      sparepart.spesifikasi_barang = updateSparepartDto.spesifikasi_barang;
      sparepart.disabled =
        updateSparepartDto.disabled === 'true' ? true : false;
      sparepart.category = null;
      return await this.sparepartService.save(sparepart);
    } catch (err: any) {
      return new Error('Error while updating sparepart');
    }
  }

  async findAll(): Promise<any> {
    return await this.sparepartService.find({
      relations: ['image'],
    });
  }

  async findActive(): Promise<Sparepart[]> {
    let sparepart: Sparepart[] = await this.sparepartService.find({
      where: {
        disabled: false,
        stok: MoreThan(0),
      },
      relations: ['image'],
    });
    return sparepart;
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
