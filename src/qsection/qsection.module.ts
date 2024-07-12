import { Module } from '@nestjs/common';
import { QsectionService } from './qsection.service';
import { QsectionController } from './qsection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QsectionEntity } from 'src/database/entity/qsection/qsection-entity';

@Module({
  imports:[TypeOrmModule.forFeature([QsectionEntity])],
  controllers: [QsectionController],
  providers: [QsectionService],
})
export class QsectionModule {}
