import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { Repository } from 'typeorm';
import { ActivePaymentMethodDto } from './dto/active-payment-method.dto';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentService: Repository<PaymentMethod>
  ) { }
  async create(createPaymentMethodDto: CreatePaymentMethodDto) : Promise<any> {
    let find_data = await this.paymentService.findOne({
      where : {
        name_payment : createPaymentMethodDto.name_payment
      }
    })

    // Kalo gak ada
    if(!find_data){
      let payment = new PaymentMethod();
      payment.name_payment = createPaymentMethodDto.name_payment.toLowerCase();
      payment.aktif = createPaymentMethodDto.aktif;
      await this.paymentService.save(payment);
      return {
        status : HttpStatus.CREATED,
        message : "Payment Method Created"
      }

    }else{

      return {
        status : HttpStatus.CONFLICT,
        message : "Payment Method already created"
      }
    }
  }

  async findAll() : Promise<PaymentMethod[]> {
    return await this.paymentService.find();
  }

  async findOne(id: number) : Promise<PaymentMethod> {
    return await this.paymentService.findOne({
      where : {
        id : id
      }
    })
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) : Promise<any> {
    await this.paymentService.update({id}, {name_payment : updatePaymentMethodDto.name_payment})
    return {
      status : HttpStatus.OK,
      message : "Data has been updated"
    }
  }

  async setActive(active: ActivePaymentMethodDto) : Promise<any> {
    let find = await this.paymentService.findOne({
      where : {
        id : active.id
      }
    })
    await this.paymentService.update({id : active.id},{aktif : !find.aktif});
    return {
      status : HttpStatus.CREATED,
      message : "Success Activating"
    }
  }

  async removeMassive(data : DeleteDTO) : Promise<any>{
    data.id.map(async (i) => {
      await this.paymentService.softDelete(i);
    });
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentMethod`;
  }
}
