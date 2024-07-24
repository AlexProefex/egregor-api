import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticService } from './estadistic.service';

describe('EstadisticService', () => {
  let service: EstadisticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadisticService],
    }).compile();

    service = module.get<EstadisticService>(EstadisticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
