import { Test, TestingModule } from '@nestjs/testing';
import { KerusakanService } from './kerusakan.service';

describe('KerusakanService', () => {
  let service: KerusakanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KerusakanService],
    }).compile();

    service = module.get<KerusakanService>(KerusakanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
