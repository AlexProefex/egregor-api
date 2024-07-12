import { Test, TestingModule } from '@nestjs/testing';
import { QsectionService } from './qsection.service';

describe('QsectionService', () => {
  let service: QsectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QsectionService],
    }).compile();

    service = module.get<QsectionService>(QsectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
