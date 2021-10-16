import { Module } from '@nestjs/common';
import { OrderBiayatambahanService } from './order-biayatambahan.service';
import { OrderBiayatambahanController } from './order-biayatambahan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBiayaTambahan } from './entities/order-biayatambahan.entity';
import { BiayaTambahanModule } from 'src/biaya-tambahan/biaya-tambahan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderBiayaTambahan]),
    BiayaTambahanModule,
  ],
  controllers: [OrderBiayatambahanController],
  providers: [OrderBiayatambahanService],
  exports: [OrderBiayatambahanService],
})
export class OrderBiayatambahanModule {}
