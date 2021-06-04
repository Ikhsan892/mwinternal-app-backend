import { Test, TestingModule } from '@nestjs/testing';
import { KeluhanService } from './keluhan.service';

describe('KeluhanService', () => {
  let service: KeluhanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeluhanService],
    }).compile();

    service = module.get<KeluhanService>(KeluhanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
