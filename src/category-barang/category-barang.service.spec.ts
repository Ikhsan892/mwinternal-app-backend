import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBarangService } from './category-barang.service';

describe('CategoryBarangService', () => {
  let service: CategoryBarangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryBarangService],
    }).compile();

    service = module.get<CategoryBarangService>(CategoryBarangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
