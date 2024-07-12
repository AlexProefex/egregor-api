import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { SectionService } from './section.service';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { SectionValidation } from 'src/database/validation/section-validation';
import { ExamValidation, updateExamValidation } from 'src/database/validation/exam-validation';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Unit Sections')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}
    //Exponer punto para el listado de todas los registro de prensa 
    @Public()
    @Get()
    getLevel():any{
        return this.sectionService.findAllSection();
    }

    //Exponer punto para obtener 3 registros aleatorios
    @Public()
    @Get(':id')
    getLevelById(@Param() params):any{
        return this.sectionService.findById(params.id);
    }

    //Exponer punto para almacenamiento de una nuevo registro de prensa
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Post('section')
    saveLevel(@Body() modelSection:SectionValidation):any{
        modelSection.type = "section";
        return this.sectionService.saveSection(modelSection);
    }

    //Exponer punto para almacenamiento de una nuevo registro de prensa
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Post('exam')
    saveExam(@Body() modelSection:ExamValidation):any{
        modelSection.type = "exam";
        return this.sectionService.saveExam(modelSection);
    }

    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Put('exam/:id')
    updateExam(@Body() modelSection:updateExamValidation, @Param() params):any{
        modelSection.type = "exam";
        return this.sectionService.updateExam(params.id, modelSection);
    }

    //Exponer punto para actualizar un registro de prensa mediante su id
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Put(':id')
    updateSection(@Body() modelSection:SectionValidation, @Param() params):any{
        modelSection.type = "section";
        return this.sectionService.updateSection(params.id, modelSection);
    }

     //Exponer punto para remover una prensa mediante su id    
     //IsParameterWithIdOfTable
    @Public()
    @Delete(':id')
    deleteSection(@Param() params:any){
         return this.sectionService.deleteSection(params.id);
     }
}
