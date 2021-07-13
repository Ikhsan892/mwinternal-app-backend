import { Test, TestingModule } from '@nestjs/testing';
import { BiayaTambahanService } from './biaya-tambahan.service';

describe('BiayaTambahanService', () => {
  let service: BiayaTambahanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiayaTambahanService],
    }).compile();

    service = module.get<BiayaTambahanService>(BiayaTambahanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
