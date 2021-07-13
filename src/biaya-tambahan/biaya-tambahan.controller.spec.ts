import { Test, TestingModule } from '@nestjs/testing';
import { BiayaTambahanController } from './biaya-tambahan.controller';
import { BiayaTambahanService } from './biaya-tambahan.service';

describe('BiayaTambahanController', () => {
  let controller: BiayaTambahanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiayaTambahanController],
      providers: [BiayaTambahanService],
    }).compile();

    controller = module.get<BiayaTambahanController>(BiayaTambahanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
