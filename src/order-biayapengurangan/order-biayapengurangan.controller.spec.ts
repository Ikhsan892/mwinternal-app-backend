import { Test, TestingModule } from '@nestjs/testing';
import { OrderBiayapenguranganController } from './order-biayapengurangan.controller';
import { OrderBiayapenguranganService } from './order-biayapengurangan.service';

describe('OrderBiayapenguranganController', () => {
  let controller: OrderBiayapenguranganController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBiayapenguranganController],
      providers: [OrderBiayapenguranganService],
    }).compile();

    controller = module.get<OrderBiayapenguranganController>(OrderBiayapenguranganController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
