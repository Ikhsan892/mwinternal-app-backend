import { Test, TestingModule } from '@nestjs/testing';
import { SelectedInventoryController } from './selected-inventory.controller';
import { SelectedInventoryService } from './selected-inventory.service';

describe('SelectedInventoryController', () => {
  let controller: SelectedInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedInventoryController],
      providers: [SelectedInventoryService],
    }).compile();

    controller = module.get<SelectedInventoryController>(SelectedInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
