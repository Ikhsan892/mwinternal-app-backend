import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { Repository } from 'typeorm';
import { ActivePengirimanDto } from './dto/active-pengiriman.dto';
import { CreatePengirimanDto } from './dto/create-pengiriman.dto';
import { UpdatePengirimanDto } from './dto/update-pengiriman.dto';
import { Pengiriman } from './entities/pengiriman.entity';

@Injectable()
export class PengirimanService {
  constructor(
    @InjectRepository(Pengiriman)
    private pengirimanService: Repository<Pengiriman>,
  ) {}

  async create(
    createPengirimanDto: CreatePengirimanDto,
    file: any,
  ): Promise<any> {
    let find_data = await this.pengirimanService.findOne({
      where: {
        nama_pengiriman: createPengirimanDto.nama_pengiriman,
      },
    });

    // Kalo gak ada
    if (!find_data) {
      let pengiriman = new Pengiriman();
      if (file) pengiriman.image_path = `/${file.filename}`;
      pengiriman.nama_pengiriman =
        createPengirimanDto.nama_pengiriman.toLowerCase();
      pengiriman.aktif = Boolean(createPengirimanDto.aktif);
      await this.pengirimanService.save(pengiriman);
      return {
        status: HttpStatus.CREATED,
        message: 'Pengiriman Method Created',
      };
    } else {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Pengiriman Method already created',
      };
    }
  }

  async findAll(): Promise<Pengiriman[]> {
    return await this.pengirimanService.find();
  }

  async findActive(): Promise<Pengiriman[]> {
    return await this.pengirimanService.find({
      where: {
        aktif: true,
      },
    });
  }

  db() {
    return this.pengirimanService;
  }

  async findOne(id: number): Promise<Pengiriman> {
    return await this.pengirimanService.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updatePengirimanDto: UpdatePengirimanDto,
    file: any,
  ): Promise<any> {
    await this.pengirimanService.update(
      { id },
      {
        nama_pengiriman: updatePengirimanDto.nama_pengiriman,
        image_path: file ? `/${file.filename}` : null,
      },
    );
    return {
      status: HttpStatus.OK,
      message: 'Data has been updated',
    };
  }

  async setActive(active: ActivePengirimanDto): Promise<any> {
    let find = await this.pengirimanService.findOne({
      where: {
        id: active.id,
      },
    });
    await this.pengirimanService.update(
      { id: active.id },
      { aktif: !find.aktif },
    );
    return {
      status: HttpStatus.CREATED,
      message: 'Success Activating',
    };
  }

  async removeMassive(data: DeleteDTO): Promise<any> {
    data.id.map(async (i) => {
      await this.pengirimanService.softDelete(i);
    });
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} pengiriman`;
  }
}
