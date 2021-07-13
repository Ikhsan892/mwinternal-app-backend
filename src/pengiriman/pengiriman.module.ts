import { Module } from '@nestjs/common';
import { PengirimanService } from './pengiriman.service';
import { PengirimanController } from './pengiriman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pengiriman } from './entities/pengiriman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pengiriman])],
  controllers: [PengirimanController],
  providers: [PengirimanService],
  exports: [PengirimanService]
})
export class PengirimanModule { }
