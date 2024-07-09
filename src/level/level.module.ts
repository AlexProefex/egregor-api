import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from 'src/database/entity/unit/unit-entity';
import { SectionEntity } from 'src/database/entity/section/section-entity';
import { ElementEntity } from 'src/database/entity/element/element-entity';

@Module({
  imports:[TypeOrmModule.forFeature([LevelEntity, UnitEntity, SectionEntity, ElementEntity])],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
