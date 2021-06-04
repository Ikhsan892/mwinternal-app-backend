import { Test, TestingModule } from '@nestjs/testing';
import { SparepartController } from './sparepart.controller';
import { SparepartService } from './sparepart.service';

describe('SparepartController', () => {
  let controller: SparepartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SparepartController],
      providers: [SparepartService],
    }).compile();

    controller = module.get<SparepartController>(SparepartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
