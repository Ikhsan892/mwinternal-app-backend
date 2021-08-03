import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) { }

  async findPelanggan(createOrderDto: CreateOrderDto): Promise<Pelanggan> {
    let pelanggan;
    let find_pelanggan = await this.pelangganService.db().findOne({
      where: {
        email: createOrderDto.email
      }
    })
    if (find_pelanggan) {
      // Kalau ada
      pelanggan = find_pelanggan;
    } else {
      // Kalau gak ada Buat User Baru
      pelanggan = await this.pelangganService.db().save(createOrderDto)
    }
    return pelanggan;
  }

  async findDuplicateInvoice(createOrderDto: CreateOrderDto): Promise<boolean> {
    let find_invoice = await this.orderService.findOne({
      where: {
        no_invoice: createOrderDto.no_invoice
      }
    })

    return find_invoice ? true : false;
  }

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    try {
      let pelanggan = await this.findPelanggan(createOrderDto);;
      let isDuplicateInvoice = await this.findDuplicateInvoice(createOrderDto);

      if (isDuplicateInvoice) {
        return {
          status: HttpStatus.CONFLICT,
          message: "No Invoice Duplicate"
        }
      } else {
        let order = new Order();
        order.pelanggan = pelanggan;
        order.payment = null;
        order.pengiriman = null;
        order.status = "new-request";
        order.no_invoice = createOrderDto.no_invoice;
        order.tanggal_invoice = createOrderDto.tanggal_invoice;
        let saved = await this.orderService.save(order);
        return {
          status: HttpStatus.CREATED,
          message: "New Order has been created",
          data: saved
        }
      }
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Order[]> {
    return await this.orderService.find({
      relations: ['pelanggan', 'payment', 'pengiriman']
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderService.findOne({
      where: {
        id: id
      },
      relations: ['pelanggan', 'payment', 'pengiriman']
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}