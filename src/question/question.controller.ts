import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionPracticeValidationCheckBox, QuestionPracticeValidationDropDown, QuestionPracticeValidationImage, QuestionPracticeValidationMovie, QuestionPracticeValidationOMultiple, QuestionPracticeValidationShortAnswer, QuestionPracticeValidationText, QuestionPracticeValidationUpdateCheckBox, QuestionPracticeValidationUpdateDropDown, QuestionPracticeValidationUpdateImage, QuestionPracticeValidationUpdateMovie, QuestionPracticeValidationUpdateOMultiple, QuestionPracticeValidationUpdateShortAnswer, QuestionPracticeValidationUpdateText } from 'src/database/validation/question-validation';
import { unlinkSync, writeFileSync } from 'fs';
import { ExceptionErrorMessage } from 'src/validation/exception-error';


@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Public()
  @Get(':id')
  getQuestion(@Param() params):any{
      return this.questionService.findById(params.id);
  }

  @Public()
  @Get('get-questions/:id')
  getQuestions(){

  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('option-multiple')
  saveMultiple(@Body() modelQuestion:QuestionPracticeValidationOMultiple):any{
    modelQuestion.type = "option-multiple";
      return this.questionService.saveQuestion(modelQuestion);
  }



  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('checkbox')
  saveLevel(@Body() modelQuestion:QuestionPracticeValidationCheckBox):any{
    modelQuestion.type = "checkbox";
    return this.questionService.saveQuestion(modelQuestion);
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('dropdown')
  saveDropdown(@Body() modelQuestion:QuestionPracticeValidationDropDown):any{
    modelQuestion.type = "dropdown";
    return this.questionService.saveQuestion(modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('short-answer')
  saveShortAnswer(@Body() modelQuestion:QuestionPracticeValidationShortAnswer):any{
    modelQuestion.type = "short-answer";
    return this.questionService.saveQuestion(modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('text')
  saveText(@Body() modelQuestion:QuestionPracticeValidationText):any{
    modelQuestion.type = "text";
    return this.questionService.saveQuestion(modelQuestion);
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('image')
  async saveImage(@Body() modelQuestion:QuestionPracticeValidationImage):Promise<any>{
      try {
        modelQuestion.type = "image";
        const base64Data = Buffer.from(modelQuestion.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
        let mimeType2 = modelQuestion.image.match(/[^:/]\w+(?=;|,)/)[0];
        writeFileSync(`public/${name}.${mimeType2}`, base64Data)
        const url = `public/${name}.${mimeType2}`            
        if(url){
          modelQuestion.url = url;
          const {image, ...model} = modelQuestion;
          await this.questionService.saveQuestion(model);
        }
    } catch (error) {
        console.log(error)
        ExceptionErrorMessage(error); 
    }
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('movie')
  saveMovie(@Body() modelQuestion:QuestionPracticeValidationMovie):any{
    modelQuestion.type = "movie";
    return this.questionService.saveQuestion(modelQuestion);
  }





  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('option-multiple/:id')
  updateOMultiple(@Body() modelQuestion:QuestionPracticeValidationUpdateOMultiple, @Param() params):any{
    modelQuestion.type = "option-multiple";
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('checkbox/:id')
  updateCheckBox(@Body() modelQuestion:QuestionPracticeValidationUpdateCheckBox, @Param() params):any{
    modelQuestion.type = "checkbox";
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('dropdown/:id')
  updateDropDown(@Body() modelQuestion:QuestionPracticeValidationUpdateDropDown, @Param() params):any{
    modelQuestion.type = "dropdown";
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('short-answer/:id')
  updateShortAnswers(@Body() modelQuestion:QuestionPracticeValidationUpdateShortAnswer, @Param() params):any{
    modelQuestion.type = "short-answer";
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }



  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('text/:id')
  updateText(@Body() modelQuestion:QuestionPracticeValidationUpdateText, @Param() params):any{
    modelQuestion.type = "text";
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('image/:id')
  async updateImage(@Body() modelQuestion:QuestionPracticeValidationUpdateImage, @Param() params):Promise<any>{
    try {
        modelQuestion.type = "image";
        if(modelQuestion.image != "undefined"){
            const question =  await this.questionService.findById(params.id);
            const base64Data = Buffer.from(modelQuestion.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
            let mimeType2 = modelQuestion.image.match(/[^:/]\w+(?=;|,)/)[0];
            writeFileSync(`public/${name}.${mimeType2}`, base64Data)
            const url = `public/${name}.${mimeType2}`            
            if(url){

                if(question.url){
                    unlinkSync(`${question.url}`);
                }
              modelQuestion.url = url;
            }
        }

        const {image, ...model} = modelQuestion;
        await this.questionService.updateQuestion(params.id, model);

    } catch (error) {
        console.log(error)
        ExceptionErrorMessage(error); 
    }
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('movie/:id')
  updateMovie(@Body() modelQuestion:QuestionPracticeValidationUpdateMovie, @Param() params):any{
    modelQuestion.type = "movie";
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }

   //Exponer punto para remover una prensa mediante su id    
   //IsParameterWithIdOfTable
  @Public()
  @Delete(':id')
  deleteLevel(@Param() params:any){
       return this.questionService.deleteQuestion(params.id);
  }
}
