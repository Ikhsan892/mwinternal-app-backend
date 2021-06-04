import { Test, TestingModule } from '@nestjs/testing';
import { ImageBarangService } from './image-barang.service';

describe('ImageBarangService', () => {
  let service: ImageBarangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageBarangService],
    }).compile();

    service = module.get<ImageBarangService>(ImageBarangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
