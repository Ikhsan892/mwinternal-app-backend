import { Test, TestingModule } from '@nestjs/testing';
import { ImageBarangController } from './image-barang.controller';
import { ImageBarangService } from './image-barang.service';

describe('ImageBarangController', () => {
  let controller: ImageBarangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageBarangController],
      providers: [ImageBarangService],
    }).compile();

    controller = module.get<ImageBarangController>(ImageBarangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
