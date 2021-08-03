import { Module } from '@nestjs/common';
import { PelangganService } from './pelanggan.service';
import { PelangganController } from './pelanggan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelanggan } from './entities/pelanggan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelanggan])],
  controllers: [PelangganController],
  providers: [PelangganService],
  exports: [PelangganService, TypeOrmModule]
})
export class PelangganModule { }
