import { Module } from '@nestjs/common';
import { SparepartService } from './sparepart.service';
import { SparepartController } from './sparepart.controller';

@Module({
  controllers: [SparepartController],
  providers: [SparepartService]
})
export class SparepartModule {}
