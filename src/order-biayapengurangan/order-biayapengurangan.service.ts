import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderBiayapenguranganDto } from './dto/create-order-biayapengurangan.dto';
import { UpdateOrderBiayapenguranganDto } from './dto/update-order-biayapengurangan.dto';
import { OrderBiayaPengurangan } from './entities/order-biayapengurangan.entity';

@Injectable()
export class OrderBiayapenguranganService {
  constructor(
    @InjectRepository(OrderBiayaPengurangan)
    private orderBiayaPengurangan: Repository<OrderBiayaPengurangan>,
  ) {}

  async create(createorderBiayaPenguranganDto: CreateOrderBiayapenguranganDto) {
    let selected = {
      ...createorderBiayaPenguranganDto,
      total: +createorderBiayaPenguranganDto.total,
    };

    return await this.orderBiayaPengurangan.save(selected);
  }

  async deleteSelected(orderId: any, nama_biaya: string) {
    let findData = await this.orderBiayaPengurangan.findOne({
      where: {
        order: orderId,
        nama_biaya: nama_biaya,
      },
    });

    return await this.orderBiayaPengurangan.softDelete(findData.id);
  }

  async findAll(orderId: any): Promise<OrderBiayaPengurangan[] | []> {
    let findBiayaByOrder = await this.orderBiayaPengurangan.find({
      where: {
        order: orderId,
      },
    });
    return findBiayaByOrder;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderBiayaPengurangan`;
  }

  update(
    id: number,
    updateorderBiayaPenguranganDto: UpdateOrderBiayapenguranganDto,
  ) {
    return `This action updates a #${id} orderBiayaPengurangan`;
  }

  async updateTotal(nama_biaya: string, orderId: any, total: number) {
    return await this.orderBiayaPengurangan.update(
      { nama_biaya: nama_biaya, order: orderId },
      { total: total },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} orderBiayaPengurangan`;
  }
}
