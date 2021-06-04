import { Module } from '@nestjs/common';
import { KeluhanService } from './keluhan.service';
import { KeluhanController } from './keluhan.controller';

@Module({
  controllers: [KeluhanController],
  providers: [KeluhanService]
})
export class KeluhanModule {}
