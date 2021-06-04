import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBarangController } from './category-barang.controller';
import { CategoryBarangService } from './category-barang.service';

describe('CategoryBarangController', () => {
  let controller: CategoryBarangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryBarangController],
      providers: [CategoryBarangService],
    }).compile();

    controller = module.get<CategoryBarangController>(CategoryBarangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
