import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { Sparepart } from './entities/sparepart.entity';

@Injectable()
export class SparepartService {
  constructor(
    @InjectRepository(Sparepart)
    private sparepartService: Repository<Sparepart>
  ) { }

  async create(createSparepartDto: CreateSparepartDto): Promise<any> {
    try {
      await this.sparepartService.save(createSparepartDto)
      return {
        status: 201,
        message: "Success inserting sparepart"
      }
    } catch (e) {
      return new InternalServerErrorException()
    }
  }

  async findAll(): Promise<any> {
    return await this.sparepartService.find()
  }

  async findOne(id: number): Promise<any> {
    return await this.sparepartService.findOne({
      where: { id }
    })
  }

  async findBulk(data: number[]): Promise<any> {
    return await this.sparepartService.findByIds(data);
  }

  async update(id: number, updateSparepartDto: UpdateSparepartDto): Promise<any> {
    return await this.sparepartService.update({ id }, updateSparepartDto)
  }

  async remove(id: number): Promise<any> {
    return await this.sparepartService.softDelete(id)
  }
}
