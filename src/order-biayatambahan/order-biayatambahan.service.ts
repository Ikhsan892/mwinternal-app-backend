import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BiayaTambahanService } from 'src/biaya-tambahan/biaya-tambahan.service';
import { Repository } from 'typeorm';
import { CreateOrderBiayatambahanDto } from './dto/create-order-biayatambahan.dto';
import { UpdateOrderBiayatambahanDto } from './dto/update-order-biayatambahan.dto';
import { OrderBiayaTambahan } from './entities/order-biayatambahan.entity';

@Injectable()
export class OrderBiayatambahanService {
  constructor(
    @InjectRepository(OrderBiayaTambahan)
    private orderBiayaTambahan: Repository<OrderBiayaTambahan>,
    private biayaTambahan: BiayaTambahanService,
  ) {}

  async create(createOrderBiayatambahanDto: CreateOrderBiayatambahanDto) {
    let selected = {
      ...createOrderBiayatambahanDto,
      total: +createOrderBiayatambahanDto.total,
    };

    return await this.orderBiayaTambahan.save(selected);
  }

  async deleteSelected(orderId: any, nama_biaya: string) {
    let findData = await this.orderBiayaTambahan.findOne({
      where: {
        order: orderId,
        nama_biaya: nama_biaya,
      },
    });

    return await this.orderBiayaTambahan.softDelete(findData.id);
  }

  async findAll(orderId: any): Promise<OrderBiayaTambahan[] | []> {
    let findBiayaByOrder = await this.orderBiayaTambahan.find({
      where: {
        order: orderId,
      },
    });
    if (findBiayaByOrder.length < 1) {
      let findActiveBiaya = await this.biayaTambahan.findUtama();
      // Insert
      if (findActiveBiaya.length > 0) {
        findActiveBiaya.map(async (i) => {
          let biaya = new OrderBiayaTambahan();
          biaya.nama_biaya = i.nama_biaya;
          biaya.total = i.biaya_ditaksir;
          biaya.order = orderId;
          await this.orderBiayaTambahan.save(biaya);
        });
        return await this.orderBiayaTambahan.find({
          where: {
            order: orderId,
          },
        });
      } else {
        return [];
      }
    } else {
      return findBiayaByOrder;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} orderBiayatambahan`;
  }

  update(id: number, updateOrderBiayatambahanDto: UpdateOrderBiayatambahanDto) {
    return `This action updates a #${id} orderBiayatambahan`;
  }

  async updateTotal(nama_biaya: string, orderId: any, total: number) {
    return await this.orderBiayaTambahan.update(
      { nama_biaya: nama_biaya, order: orderId },
      { total: total },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} orderBiayatambahan`;
  }
}
