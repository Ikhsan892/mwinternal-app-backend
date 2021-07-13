import { Module } from '@nestjs/common';
import { BiayaTambahanService } from './biaya-tambahan.service';
import { BiayaTambahanController } from './biaya-tambahan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiayaTambahan } from './entities/biaya-tambahan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiayaTambahan])],
  controllers: [BiayaTambahanController],
  providers: [BiayaTambahanService],
  exports: [BiayaTambahanService]
})
export class BiayaTambahanModule { }
