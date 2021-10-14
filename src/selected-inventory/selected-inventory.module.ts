import { Module } from '@nestjs/common';
import { SelectedInventoryService } from './selected-inventory.service';
import { SelectedInventoryController } from './selected-inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectedInventory } from './entities/selected-inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SelectedInventory])],
  controllers: [SelectedInventoryController],
  providers: [SelectedInventoryService],
  exports: [SelectedInventoryService],
})
export class SelectedInventoryModule {}
