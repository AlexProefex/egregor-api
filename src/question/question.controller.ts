import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put, Res, HttpStatus } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionPracticeValidationCheckBox, QuestionPracticeValidationDropDown, QuestionPracticeValidationImage, QuestionPracticeValidationMovie, QuestionPracticeValidationOMultiple, QuestionPracticeValidationShortAnswer, QuestionPracticeValidationText, QuestionPracticeValidationUpdateCheckBox, QuestionPracticeValidationUpdateDropDown, QuestionPracticeValidationUpdateImage, QuestionPracticeValidationUpdateMovie, QuestionPracticeValidationUpdateOMultiple, QuestionPracticeValidationUpdateShortAnswer, QuestionPracticeValidationUpdateText, QuestionValidateOrder } from 'src/database/validation/question-validation';
import { unlinkSync, writeFileSync } from 'fs';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Response } from 'express';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { TypeCheckBox, TypeDropDown, TypeImage, TypeMovie, TypeOptionMultiple, TypeShortAnswer, TypeText } from 'src/util/constants';
import { StorageService } from 'src/storage/storage.service';


@ApiTags('Questions')
@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private storageService: StorageService
  ) {}

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una pregunta'})
  @ApiExcludeEndpoint()
  getQuestion(@Param() params:ParameterValidation):any{
      return this.questionService.findById(params.id);
  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('option-multiple')
  @ApiOperation({ summary: 'Crea una pregunta tipo opcion multiple'})
  saveMultiple(@Body() modelQuestion:QuestionPracticeValidationOMultiple):any{
    modelQuestion.type = TypeOptionMultiple;
    return this.questionService.saveQuestion(modelQuestion);
  }



  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('checkbox')
  @ApiOperation({ summary: 'Crea una pregunta tipo casilla de verificacion'})
  saveLevel(@Body() modelQuestion:QuestionPracticeValidationCheckBox):any{
    modelQuestion.type = TypeCheckBox;
    return this.questionService.saveQuestion(modelQuestion);
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('dropdown')
  @ApiOperation({ summary: 'Crea una pregunta tipo lista'})
  saveDropdown(@Body() modelQuestion:QuestionPracticeValidationDropDown):any{
    modelQuestion.type = TypeDropDown;
    return this.questionService.saveQuestion(modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('short-answer')
  @ApiOperation({ summary: 'Crea una pregunta tipo respuesta corta'})
  saveShortAnswer(@Body() modelQuestion:QuestionPracticeValidationShortAnswer):any{
    modelQuestion.type = TypeShortAnswer;
    return this.questionService.saveQuestion(modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('text')
  @ApiOperation({ summary: 'Crea una pregunta tipo texto'})
  saveText(@Body() modelQuestion:QuestionPracticeValidationText):any{
    modelQuestion.type = TypeText;
    return this.questionService.saveQuestion(modelQuestion);
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('image')
  @ApiOperation({ summary: 'Crea una elemento tipo imagen'})
  async saveImage(@Body() modelQuestion:QuestionPracticeValidationImage):Promise<any>{
    try {
      modelQuestion.type = TypeImage;
      const response = await this.storageService.upload(modelQuestion.image)
      if (response) {
        modelQuestion.url = response
        const { image, ...model } = modelQuestion;
        await this.questionService.saveQuestion(model);
      }
    }
    catch (error) {
      console.log(error)
      ExceptionErrorMessage(error);
    }
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('movie')
  @ApiOperation({ summary: 'Crea una elemento tipo video'})
  saveMovie(@Body() modelQuestion:QuestionPracticeValidationMovie):any{
    modelQuestion.type = TypeMovie;
    return this.questionService.saveQuestion(modelQuestion);
  }





  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('option-multiple/:id')
  @ApiOperation({ summary: 'Actualiza una elemento tipo opcion multiple por su identificador'})
  updateOMultiple(@Body() modelQuestion:QuestionPracticeValidationUpdateOMultiple, @Param() params:ParameterValidation):any{
    modelQuestion.type = TypeOptionMultiple;
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('checkbox/:id')
  @ApiOperation({ summary: 'Actualiza una elemento tipo casilla de verificacion por su identificador'})
  updateCheckBox(@Body() modelQuestion:QuestionPracticeValidationUpdateCheckBox, @Param() params:ParameterValidation):any{
    modelQuestion.type = TypeCheckBox;
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('dropdown/:id')
  @ApiOperation({ summary: 'Actualiza una elemento tipo lista por su identificador'})
  updateDropDown(@Body() modelQuestion:QuestionPracticeValidationUpdateDropDown, @Param() params:ParameterValidation):any{
    modelQuestion.type = TypeDropDown;
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('short-answer/:id')
  @ApiOperation({ summary: 'Actualiza una elemento tipo respuesta corta por su identificador'})
  updateShortAnswers(@Body() modelQuestion:QuestionPracticeValidationUpdateShortAnswer, @Param() params:ParameterValidation):any{
    modelQuestion.type = TypeShortAnswer;
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }



  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('text/:id')
  @ApiOperation({ summary: 'Actualiza una elemento tipo texto por su identificador'})
  updateText(@Body() modelQuestion:QuestionPracticeValidationUpdateText, @Param() params:ParameterValidation):any{
    modelQuestion.type = TypeText;
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('image/:id')
  @ApiOperation({ summary: 'Actualiza una elemento tipo imagen por su identificador'})
  async updateImage(@Body() modelQuestion:QuestionPracticeValidationUpdateImage, @Param() params:ParameterValidation):Promise<any>{
    try {
      modelQuestion.type = TypeImage;
      const material = await this.questionService.findById(params.id)
      if (modelQuestion.image != "undefinied") {
        const response = await this.storageService.upload(modelQuestion.image)
        if (response) {
          modelQuestion.url = response
          await this.storageService.remove(material.url)
        }
      }
      const { image, ...model } = modelQuestion;
      await this.questionService.updateQuestion(params.id,model);

    } catch (error) {
      ExceptionErrorMessage(error);
    }

  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('movie/:id')
  @ApiOperation({ summary: 'Actualiza una elemento tipo video por su identificador'})
  updateMovie(@Body() modelQuestion:QuestionPracticeValidationUpdateMovie, @Param() params:ParameterValidation):any{
    modelQuestion.type = TypeMovie;
    return this.questionService.updateQuestion(params.id, modelQuestion);
  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('move')
  @ApiOperation({ summary: 'Mueve un elemento hacia otra posicion'})
  async moveQuestion(@Body() modelQuestion:QuestionValidateOrder, @Res()  response: Response):Promise<any>{
    await  this.questionService.moveQuestion(modelQuestion);
    return response.status(HttpStatus.ACCEPTED).json({});
  }

   //Exponer punto para remover una prensa mediante su id    
   //IsParameterWithIdOfTable
  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Borra una pregunta'})
  async deleteLevel(@Param() params:ParameterValidation, @Res() res: Response){
       const response =   await  this.questionService.deleteQuestion(params.id);
        if(!response) return res.status(HttpStatus.NOT_FOUND).json({"message":"registro no encontrado"});
        return res.status(HttpStatus.ACCEPTED).json({"message":"El registro seleccionado ha sido eliminado"})
  }



}
