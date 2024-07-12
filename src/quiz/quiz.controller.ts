import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Public } from 'src/auth/auth.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Public()
  @Get(':id')
  getLevelAll(@Param() params):any{
      return this.quizService.findQuiz(params.id);
  }
}
