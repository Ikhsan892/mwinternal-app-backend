import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreatePelangganDto } from './dto/create-pelanggan.dto';
import { DeleteDTO } from './dto/delete-massive.dto';
import { UpdatePelangganDto } from './dto/update-pelanggan.dto';
import { Pelanggan } from './entities/pelanggan.entity';
import { data } from './mock/pelanggan.mock'

@Injectable()
export class PelangganService {

  constructor(
    @InjectRepository(Pelanggan)
    private pelangganService: Repository<Pelanggan>
  ) { }


  async insertMany(): Promise<any> {
    data.map(async (i) => {
      let pelanggan = new Pelanggan();
      pelanggan.no_telepon = i.no_telepon.toString();
      pelanggan.nama_depan = i.nama_depan;
      pelanggan.nama_belakang = i.nama_belakang;
      pelanggan.umur = i.umur.toString();
      pelanggan.alamat = i.alamat;
      pelanggan.provinsi = i.provinsi;
      pelanggan.email = i.email;
      pelanggan.kecamatan = i.kecamatan;
      pelanggan.kota_kabupaten = i.kota_kabupaten;
      pelanggan.gender = i.gender;
      pelanggan.negara = i.negara;
      await this.pelangganService.save(pelanggan);
    });
    return 201;
  }


  async create(createPelangganDto: CreatePelangganDto): Promise<any> {
    try {
      let find_email = await this.pelangganService.find({
        where: {
          email: createPelangganDto.email
        }
      });
      if (find_email.length > 0) {
        return {
          status: 403,
          message: "Email already registered"
        }
      } else {
        await this.pelangganService.save(createPelangganDto)
        return {
          status: 201,
          message: "Success inserting customer"
        }
      }
    } catch (error) {
      return new InternalServerErrorException()
    }
  }

  async findAll(): Promise<any> {
    return await this.pelangganService.find()
  }

  async findOne(id: number): Promise<any> {
    return await this.pelangganService.findOne({
      where: {
        id
      },
      relations: ['invoice']
    })
  }

  async update(id: number, updatePelangganDto: UpdatePelangganDto): Promise<any> {
    return await this.pelangganService.update({ id }, updatePelangganDto)
  }

  async remove(id: number): Promise<any> {
    return await this.pelangganService.softDelete(id)
  }

  async removeMassive(data: DeleteDTO): Promise<any> {
    data.id.map(async (i) => {
      await this.pelangganService.softDelete(i);
    });
    return data;
  }
}
