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
      return await this.sparepartService.save(createSparepartDto);
    }
  }

  async findAll(): Promise<any> {
    return await this.sparepartService.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.sparepartService.findOne({
      where: { id },
    });
  }

  async findBulk(data: number[]): Promise<any> {
    return await this.sparepartService.findByIds(data);
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
