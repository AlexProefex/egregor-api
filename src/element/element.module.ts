import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { ElementEntity } from 'src/database/entity/element/element-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { LevelEntity } from 'src/database/entity/level/level-entity';

@Module({
  imports:[TypeOrmModule.forFeature([ElementEntity, LevelEntity])],
  controllers: [ElementController],
  providers: [ElementService,LevelService],
})
export class ElementModule {}
