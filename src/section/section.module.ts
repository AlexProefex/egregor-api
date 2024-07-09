import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { SectionEntity } from 'src/database/entity/section/section-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { DataSource } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([SectionEntity,QuizEntity])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {constructor (private datasource:DataSource){}}
