import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Public } from 'src/auth/auth.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { StorageService } from 'src/storage/storage.service';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private storageService:StorageService
  ) {}

  @Public()
  @Get('panel/:id')
  @ApiOperation({ summary: 'Obtiene los datos del panel del examen o practica'})
  async getPanelInfo(@Param() params:ParameterValidation):Promise<any> {
    return await this.quizService.findPanel(params.id)
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene la estructura de examen o practica'})
  async getLevelAll(@Param() params:ParameterValidation):Promise<any> {
    let quizs = await this.quizService.findQuiz(params.id);
    for(const quiz of quizs){
      for(const sections of quiz.qsection){
          for(const element of sections.question) {
              if(element.type == "image"){
                  element.url = await this.storageService.getLinks(element.url);
              }
             console.log(element)
          } 
      }
    }
    return quizs;
  }

  
}
