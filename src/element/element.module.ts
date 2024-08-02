import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { ElementEntity } from 'src/database/entity/element/element-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { StorageService } from 'src/storage/storage.service';
import { UnitEntity } from 'src/database/entity/unit/unit-entity';
import { SectionEntity } from 'src/database/entity/section/section-entity';

@Module({
  imports:[TypeOrmModule.forFeature([ElementEntity, LevelEntity,QuizEntity, UnitEntity, SectionEntity])],
  controllers: [ElementController],
  providers: [ElementService,LevelService,StorageService],
})
export class ElementModule {}
