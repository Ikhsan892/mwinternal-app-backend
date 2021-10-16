import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveBiayaTambahanDTO } from './dto/active-biaya-tambahan.dto';
import { CreateBiayaTambahanDto } from './dto/create-biaya-tambahan.dto';
import { DeleteBiayaTambahanDTO } from './dto/delete-biaya-tambahan.dto';
import { UpdateBiayaTambahanDto } from './dto/update-biaya-tambahan.dto';
import { BiayaTambahan } from './entities/biaya-tambahan.entity';

@Injectable()
export class BiayaTambahanService {
  constructor(
    @InjectRepository(BiayaTambahan)
    private biayaService: Repository<BiayaTambahan>,
  ) {}

  async create(createBiayaTambahanDto: CreateBiayaTambahanDto): Promise<any> {
    let find_data = await this.biayaService.findOne({
      where: {
        nama_biaya: createBiayaTambahanDto.nama_biaya,
      },
    });

    // Kalo gak ada
    if (!find_data) {
      let biaya = new BiayaTambahan();
      biaya.nama_biaya = createBiayaTambahanDto.nama_biaya.toLowerCase();
      biaya.is_utama = createBiayaTambahanDto.is_utama;
      biaya.biaya_ditaksir = createBiayaTambahanDto.biaya_ditaksir;
      await this.biayaService.save(biaya);
      return {
        status: HttpStatus.CREATED,
        message: 'Biaya Tambahan Created',
      };
    } else {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Biaya Tambahan already created',
      };
    }
  }

  async findAll(): Promise<BiayaTambahan[]> {
    return await this.biayaService.find();
  }

  async findUtama(): Promise<BiayaTambahan[]> {
    return await this.biayaService.find({
      where: {
        is_utama: true,
      },
    });
  }

  async setActive(active: ActiveBiayaTambahanDTO): Promise<any> {
    let find = await this.biayaService.findOne({
      where: {
        id: active.id,
      },
    });
    await this.biayaService.update(
      { id: active.id },
      { is_utama: !find.is_utama },
    );
    return {
      status: HttpStatus.CREATED,
      message: 'Success Activating',
    };
  }

  async findOne(id: number): Promise<BiayaTambahan> {
    return await this.biayaService.findOne({
      where: {
        id: id,
      },
    });
  }
  async update(
    id: number,
    updateBiayaTambahanDto: UpdateBiayaTambahanDto,
  ): Promise<any> {
    await this.biayaService.update({ id }, updateBiayaTambahanDto);
    return {
      status: HttpStatus.OK,
      message: 'Data has been updated',
    };
  }

  async removeMassive(data: DeleteBiayaTambahanDTO): Promise<any> {
    data.id.map(async (i) => {
      await this.biayaService.softDelete(i);
    });
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} biayaTambahan`;
  }
}
