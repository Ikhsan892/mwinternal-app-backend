import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethodService } from 'src/payment-method/payment-method.service';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { Pelanggan } from 'src/pelanggan/entities/pelanggan.entity';
import { PelangganService } from 'src/pelanggan/pelanggan.service';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { CreateSelectedInventoryDto } from 'src/selected-inventory/dto/create-selected-inventory.dto';
import { SelectedInventoryService } from 'src/selected-inventory/selected-inventory.service';
import { Sparepart } from 'src/sparepart/entities/sparepart.entity';
import { SparepartService } from 'src/sparepart/sparepart.service';
import { Connection, createConnection, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { SelectedInterface } from './dto/selected-item.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderService: Repository<Order>,
    private productService: ProductService,
    private paymentService: PaymentMethodService,
    private sparepartService: SparepartService,
    private pelangganService: PelangganService,
    private selectedInventory: SelectedInventoryService,
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

  async updateStatus(status: string, id: number) {
    return await this.orderService.update({ id: id }, { status: status });
  }

  async updatePayment(payment: number, id: number) {
    let findPayment = await this.paymentService.db().findOne({
      id: payment,
    });
    return await this.orderService.update({ id: id }, { payment: findPayment });
  }

  async updateDPS(id: number, dp: number) {
    return await this.orderService.update({ id: id }, { dp: dp });
  }

  async updateTotal(id: number, total: number) {
    return await this.orderService.update({ id: id }, { total: total });
  }

  async findDuplicateInvoice(createOrderDto: CreateOrderDto): Promise<boolean> {
    let find_invoice = await this.orderService.findOne({
      where: {
        no_invoice: createOrderDto.no_invoice,
      },
    });

    return find_invoice ? true : false;
  }

  async findSelected(id: string): Promise<SelectedInterface[]> {
    let hasil: SelectedInterface[] = [];
    let data = await this.selectedInventory.findOne(+id);

    data.map((i) => {
      let nama_barang_: string =
        i.tipe_barang === 'accessories' || i.tipe_barang === 'produk'
          ? i.product.nama_barang
          : i.sparepart.nama_barang;

      let harga_jual_: number =
        i.tipe_barang === 'accessories' || i.tipe_barang === 'produk'
          ? i.product.harga_jual
          : i.sparepart.harga_jual;
      hasil.push({
        id: i.id,
        harga_jual: harga_jual_,
        nama_barang: nama_barang_,
        total_stok:
          i.tipe_barang === 'accessories' || i.tipe_barang === 'produk'
            ? i.product.stok
            : i.sparepart.stok,
        defaultSelect: i.stok,
        total: i.total_harga,
        idUnique: `prod-${i.id}-${i.tipe_barang}`,
        tipe_barang: i.tipe_barang,
      });
    });
    return hasil;
  }

  async joinSelectedProduct(product_: any): Promise<Product | Error> {
    try {
      let findOrder = await this.orderService.findOne({
        where: {
          id: +product_.order,
        },
      });

      let findProduct = await this.productService.db().findOne({
        where: {
          id: +product_.id,
        },
      });

      let selectedDto: CreateSelectedInventoryDto = {
        order: findOrder.id,
        product: findProduct.id,
        stok: product_.stok,
        total_harga: product_.total_harga,
        tipe_barang: product_.tipe_barang,
      };

      let data = await this.selectedInventory.create(selectedDto);
      return { ...data, total_stok: findProduct.stok };
    } catch (err: any) {
      return err;
    }
  }

  async deleteSelectedInventory(order: number, id: number): Promise<any> {
    return await this.selectedInventory.delete(order, id);
  }

  async changeStoks(id: number, stok: number, total: number): Promise<any> {
    return await this.selectedInventory.changeStok(id, stok, total);
  }

  async joinSelectedSparepart(sparepart: any): Promise<Sparepart | Error> {
    try {
      let findOrder = await this.orderService.findOne({
        where: {
          id: +sparepart.order,
        },
      });

      let findSparepart = await this.sparepartService.db().findOne({
        where: {
          id: +sparepart.id,
        },
      });

      let selectedDto: CreateSelectedInventoryDto = {
        order: findOrder.id,
        sparepart: findSparepart.id,
        stok: sparepart.stok,
        total_harga: sparepart.total_harga,
        tipe_barang: sparepart.tipe_barang,
      };

      let data = await this.selectedInventory.create(selectedDto);
      return { ...data, total_stok: findSparepart.stok };
    } catch (err: any) {
      return err;
    }
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
        { status: 'menunggu kepastian' },
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
