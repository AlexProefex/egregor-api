import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([QuizEntity])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
