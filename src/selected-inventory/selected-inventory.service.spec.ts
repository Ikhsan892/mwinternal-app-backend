import { Test, TestingModule } from '@nestjs/testing';
import { SelectedInventoryService } from './selected-inventory.service';

describe('SelectedInventoryService', () => {
  let service: SelectedInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedInventoryService],
    }).compile();

    service = module.get<SelectedInventoryService>(SelectedInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
