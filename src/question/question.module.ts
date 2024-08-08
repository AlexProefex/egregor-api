import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionEntity } from 'src/database/entity/question/question-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from 'src/storage/storage.service';
import { QsectionEntity } from 'src/database/entity/qsection/qsection-entity';

@Module({
  imports:[TypeOrmModule.forFeature([QuestionEntity, QsectionEntity])],
  controllers: [QuestionController],
  providers: [QuestionService,StorageService],
})
export class QuestionModule {}
