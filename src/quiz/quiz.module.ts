import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from 'src/storage/storage.service';
import { QsectionEntity } from 'src/database/entity/qsection/qsection-entity';
import { QuestionEntity } from 'src/database/entity/question/question-entity';

@Module({
  imports:[TypeOrmModule.forFeature([QuizEntity,QsectionEntity,QuestionEntity])],
  controllers: [QuizController],
  providers: [QuizService,StorageService],
})
export class QuizModule {}
