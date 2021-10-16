import { Test, TestingModule } from '@nestjs/testing';
import { OrderBiayatambahanService } from './order-biayatambahan.service';

describe('OrderBiayatambahanService', () => {
  let service: OrderBiayatambahanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderBiayatambahanService],
    }).compile();

    service = module.get<OrderBiayatambahanService>(OrderBiayatambahanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
