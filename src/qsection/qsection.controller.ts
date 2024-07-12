import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { QsectionService } from './qsection.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { QSectionValidation, QSectionValidationUpdate } from 'src/database/validation/qsection-validation';

@ApiTags('Quiz Section')
@Controller('qsection')
export class QsectionController {
  constructor(private readonly qsectionService: QsectionService) {}

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('/section')
  saveQSection(@Body() modelQSection:QSectionValidation):any{
      return this.qsectionService.saveQSection(modelQSection);
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('/section/:id')
  updateQsection(@Body() modelQSection:QSectionValidationUpdate, @Param() params):any{
      return this.qsectionService.updateQSection(params.id, modelQSection);
  }

  @Public()
  @Delete('/section/:id')
  deleteQSection(@Param() params:any){
       return this.qsectionService.deleteQSection(params.id);
   }

}
