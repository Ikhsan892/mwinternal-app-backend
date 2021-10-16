import { Test, TestingModule } from '@nestjs/testing';
import { OrderBiayatambahanController } from './order-biayatambahan.controller';
import { OrderBiayatambahanService } from './order-biayatambahan.service';

describe('OrderBiayatambahanController', () => {
  let controller: OrderBiayatambahanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBiayatambahanController],
      providers: [OrderBiayatambahanService],
    }).compile();

    controller = module.get<OrderBiayatambahanController>(OrderBiayatambahanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
