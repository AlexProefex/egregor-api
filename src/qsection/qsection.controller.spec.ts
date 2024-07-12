import { Test, TestingModule } from '@nestjs/testing';
import { QsectionController } from './qsection.controller';
import { QsectionService } from './qsection.service';

describe('QsectionController', () => {
  let controller: QsectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QsectionController],
      providers: [QsectionService],
    }).compile();

    controller = module.get<QsectionController>(QsectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
