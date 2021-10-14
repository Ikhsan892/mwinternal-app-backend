import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelectedInventoryDto } from './dto/create-selected-inventory.dto';
import { UpdateSelectedInventoryDto } from './dto/update-selected-inventory.dto';
import { SelectedInventory } from './entities/selected-inventory.entity';

@Injectable()
export class SelectedInventoryService {
  constructor(
    @InjectRepository(SelectedInventory)
    private selectedService: Repository<SelectedInventory>,
  ) {}
  async create(
    createSelectedInventoryDto: CreateSelectedInventoryDto,
  ): Promise<any> {
    let findDuplicate;
    if (createSelectedInventoryDto.tipe_barang === 'sparepart') {
      findDuplicate = await this.selectedService.findOne({
        where: {
          order: createSelectedInventoryDto.order,
          sparepart: createSelectedInventoryDto.sparepart,
        },
      });
    } else {
      findDuplicate = await this.selectedService.findOne({
        where: {
          order: createSelectedInventoryDto.order,
          product: createSelectedInventoryDto.product,
        },
      });
    }

    if (!findDuplicate) {
      return await this.selectedService.save(createSelectedInventoryDto);
    }
  }

  findAll() {
    return `This action returns all selectedInventory`;
  }

  async findOne(id: number): Promise<SelectedInventory[]> {
    return await this.selectedService.find({
      where: {
        order: id,
      },
      relations: ['product', 'sparepart', 'order'],
    });
  }

  async changeStok(id: number, stok: number, total: number) {
    return await this.selectedService.update(
      { id: id },
      { stok: stok, total_harga: total },
    );
  }

  update(id: number, updateSelectedInventoryDto: UpdateSelectedInventoryDto) {
    return `This action updates a #${id} selectedInventory`;
  }

  async delete(order: number, id: number) {
    return await this.selectedService.softDelete(id);
  }

  remove(id: number) {
    return `This action removes a #${id} selectedInventory`;
  }

  db() {
    return this.selectedService;
  }
}
