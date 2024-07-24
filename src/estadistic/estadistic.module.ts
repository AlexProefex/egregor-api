import { Module } from '@nestjs/common';
import { EstadisticService } from './estadistic.service';
import { EstadisticController } from './estadistic.controller';

@Module({
  controllers: [EstadisticController],
  providers: [EstadisticService],
})
export class EstadisticModule {}
