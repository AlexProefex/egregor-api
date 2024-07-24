import { Test, TestingModule } from '@nestjs/testing';
import { EstadisticController } from './estadistic.controller';
import { EstadisticService } from './estadistic.service';

describe('EstadisticController', () => {
  let controller: EstadisticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadisticController],
      providers: [EstadisticService],
    }).compile();

    controller = module.get<EstadisticController>(EstadisticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
