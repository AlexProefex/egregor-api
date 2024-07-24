import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { QsectionService } from './qsection.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { QSectionValidation, QSectionValidationUpdate } from 'src/database/validation/qsection-validation';
import { ParameterValidation } from 'src/database/validation/parameter-validation';

@ApiTags('Quiz Section')
@Controller('qsection')
export class QsectionController {
  constructor(private readonly qsectionService: QsectionService) {}

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('/section')
  @ApiOperation({ summary: 'Crea una nueva seccion dentro de un examen o practica'})
  saveQSection(@Body() modelQSection:QSectionValidation):any{
      return this.qsectionService.saveQSection(modelQSection);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('/section/:id')
  @ApiOperation({ summary: 'Actualiza una seccion dentro de un examen o practica'})
  updateQsection(@Body() modelQSection:QSectionValidationUpdate, @Param() params:ParameterValidation):any{
      return this.qsectionService.updateQSection(params.id, modelQSection);
  }

  @Public()
  @Delete('/section/:id')
  @ApiOperation({ summary: 'Borra una seccion dentro de un examen o practica'})
  deleteQSection(@Param() params:ParameterValidation){
       return this.qsectionService.deleteQSection(params.id);
   }

}
