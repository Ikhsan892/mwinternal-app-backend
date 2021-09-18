import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { Pelanggan } from 'src/pelanggan/entities/pelanggan.entity';
import { PelangganService } from 'src/pelanggan/pelanggan.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderService: Repository<Order>,
    private pelangganService: PelangganService,
  ) {}

  async findPelanggan(createOrderDto: CreateOrderDto): Promise<Pelanggan> {
    let pelanggan;
    let find_pelanggan = await this.pelangganService.db().findOne({
      where: {
        email: createOrderDto.email,
      },
    });
    if (find_pelanggan) {
      // Kalau ada
      pelanggan = find_pelanggan;
    } else {
      // Kalau gak ada Buat User Baru
      pelanggan = await this.pelangganService.db().save(createOrderDto);
    }
    return pelanggan;
  }

  async findDuplicateInvoice(createOrderDto: CreateOrderDto): Promise<boolean> {
    let find_invoice = await this.orderService.findOne({
      where: {
        no_invoice: createOrderDto.no_invoice,
      },
    });

    return find_invoice ? true : false;
  }

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    try {
      let pelanggan = await this.findPelanggan(createOrderDto);
      let isDuplicateInvoice = await this.findDuplicateInvoice(createOrderDto);

      if (isDuplicateInvoice) {
        return {
          status: HttpStatus.CONFLICT,
          message: 'No Invoice Duplicate',
        };
      } else {
        let order = new Order();
        order.pelanggan = pelanggan;
        order.payment = null;
        order.pengiriman = null;
        order.status = 'new-request';
        order.no_invoice = createOrderDto.no_invoice;
        order.year = new Date(createOrderDto.tanggal_invoice).getFullYear();
        order.month = new Date(createOrderDto.tanggal_invoice).getMonth();
        order.tipe = createOrderDto.tipe;
        order.tanggal_invoice = createOrderDto.tanggal_invoice;
        let saved = await this.orderService.save(order);
        return {
          status: HttpStatus.CREATED,
          message: 'New Order has been created',
          data: saved,
        };
      }
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Order[]> {
    return await this.orderService.find({
      relations: ['pelanggan', 'payment', 'pengiriman'],
    });
  }

  async findOne(id: number): Promise<Order> {
    let data = await this.orderService.findOne({
      where: {
        id: id,
      },
      relations: [
        'pelanggan',
        'payment',
        'pengiriman',
        'barang',
        'barang.teknisi',
      ],
    });
    if (data.status === 'new-request') {
      // Kalo diliat detailnya tapi masih new request
      await this.orderService.update(
        { id: id },
        { status: 'menunggu pembayaran' },
      );
    }
    return data;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async removeMassive(data: DeleteDTO): Promise<any> {
    data.id.map(async (i) => {
      await this.orderService.softDelete(i);
    });
    return data;
  }

  async remove(id: number): Promise<any> {
    return await this.orderService.softDelete(id);
  }
}
