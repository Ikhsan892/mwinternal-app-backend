import { Module } from '@nestjs/common';
import { OrderBiayapenguranganService } from './order-biayapengurangan.service';
import { OrderBiayapenguranganController } from './order-biayapengurangan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBiayaPengurangan } from './entities/order-biayapengurangan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBiayaPengurangan])],
  controllers: [OrderBiayapenguranganController],
  providers: [OrderBiayapenguranganService],
  exports: [OrderBiayapenguranganService],
})
export class OrderBiayapenguranganModule {}
