import { Test, TestingModule } from '@nestjs/testing';
import { SparepartService } from './sparepart.service';

describe('SparepartService', () => {
  let service: SparepartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SparepartService],
    }).compile();

    service = module.get<SparepartService>(SparepartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
