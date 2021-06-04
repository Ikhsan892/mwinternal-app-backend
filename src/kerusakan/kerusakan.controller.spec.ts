import { Test, TestingModule } from '@nestjs/testing';
import { KerusakanController } from './kerusakan.controller';
import { KerusakanService } from './kerusakan.service';

describe('KerusakanController', () => {
  let controller: KerusakanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KerusakanController],
      providers: [KerusakanService],
    }).compile();

    controller = module.get<KerusakanController>(KerusakanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
