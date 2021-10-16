import { Test, TestingModule } from '@nestjs/testing';
import { OrderBiayapenguranganService } from './order-biayapengurangan.service';

describe('OrderBiayapenguranganService', () => {
  let service: OrderBiayapenguranganService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderBiayapenguranganService],
    }).compile();

    service = module.get<OrderBiayapenguranganService>(OrderBiayapenguranganService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
