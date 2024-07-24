import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { UnitEntity } from 'src/database/entity/unit/unit-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from 'src/database/entity/section/section-entity';
import { ElementEntity } from 'src/database/entity/element/element-entity';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';

@Module({
  imports:[TypeOrmModule.forFeature([UnitEntity, SectionEntity, ElementEntity,QuizEntity])],
  controllers: [UnitController],
  providers: [UnitService],
})



export class UnitModule {}
