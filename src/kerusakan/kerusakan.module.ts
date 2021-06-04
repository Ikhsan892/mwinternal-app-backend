import { Module } from '@nestjs/common';
import { KerusakanService } from './kerusakan.service';
import { KerusakanController } from './kerusakan.controller';

@Module({
  controllers: [KerusakanController],
  providers: [KerusakanService]
})
export class KerusakanModule {}
