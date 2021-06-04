import { Test, TestingModule } from '@nestjs/testing';
import { KeluhanController } from './keluhan.controller';
import { KeluhanService } from './keluhan.service';

describe('KeluhanController', () => {
  let controller: KeluhanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeluhanController],
      providers: [KeluhanService],
    }).compile();

    controller = module.get<KeluhanController>(KeluhanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
