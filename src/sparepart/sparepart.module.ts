import { Module } from '@nestjs/common';
import { SparepartService } from './sparepart.service';
import { SparepartController } from './sparepart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sparepart } from './entities/sparepart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sparepart])],
  controllers: [SparepartController],
  providers: [SparepartService],
  exports: [SparepartService],
})
export class SparepartModule {}
