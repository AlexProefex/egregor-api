import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Public } from 'src/auth/auth.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene la estructura de examen o practica'})
  getLevelAll(@Param() params:ParameterValidation):any{
      return this.quizService.findQuiz(params.id);
  }
}
