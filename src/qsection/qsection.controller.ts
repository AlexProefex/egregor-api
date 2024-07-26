import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put, Res, HttpStatus } from '@nestjs/common';
import { QsectionService } from './qsection.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { QSectionValidation, QSectionValidationUpdate } from 'src/database/validation/qsection-validation';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { Response } from 'express';

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
  async deleteQSection(@Param() params:ParameterValidation, @Res() res: Response){
    const response =   await  this.qsectionService.deleteQSection(params.id);
    if(!response) return res.status(HttpStatus.NOT_FOUND).json({"message":"registro no encontrado"});
    return res.status(HttpStatus.ACCEPTED).json({"message":"El registro seleccionado ha sido eliminado"})
   }

}
