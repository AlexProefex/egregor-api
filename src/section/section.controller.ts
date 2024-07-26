import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put, Res, HttpStatus } from '@nestjs/common';
import { SectionService } from './section.service';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { SectionValidation } from 'src/database/validation/section-validation';
import { ExamValidation, updateExamValidation } from 'src/database/validation/exam-validation';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { TypeExam, TypeSection } from 'src/util/constants';
import { Response } from 'express';

@ApiTags('Unit Sections')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}
    //Exponer punto para el listado de todas los registro de prensa 
    @Public()
    @Get()
    @ApiOperation({ summary: 'Obtiene todas las secciones'})
    getLevel():any{
        return this.sectionService.findAllSection();
    }

    //Exponer punto para obtener 3 registros aleatorios
    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'Obtiene los datos de una seccion por su identificador'})
    getLevelById(@Param() params:ParameterValidation):any{
        return this.sectionService.findById(params.id);
    }

    //Exponer punto para almacenamiento de una nuevo registro de prensa
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Post('section')
    @ApiOperation({ summary: 'Crea una nueva seccion'})
    saveLevel(@Body() modelSection:SectionValidation):any{
        modelSection.type = TypeSection;
        return this.sectionService.saveSection(modelSection);
    }

    //Exponer punto para almacenamiento de una nuevo registro de prensa
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Post('exam')
    @ApiOperation({ summary: 'Crea una nuevo examen'})
    saveExam(@Body() modelSection:ExamValidation):any{
        modelSection.type = TypeExam;
        return this.sectionService.saveExam(modelSection);
    }

    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Put('exam/:id')
    @ApiOperation({ summary: 'Actualiza el examen por su identificador'})
    updateExam(@Body() modelSection:updateExamValidation, @Param() params:ParameterValidation):any{
        modelSection.type = TypeExam;
        return this.sectionService.updateExam(params.id, modelSection);
    }

    //Exponer punto para actualizar un registro de prensa mediante su id
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Put(':id')
    @ApiOperation({ summary: 'Actualiza la seccion por su identificador'})
    updateSection(@Body() modelSection:SectionValidation, @Param() params:ParameterValidation):any{
        modelSection.type = TypeSection;
        return this.sectionService.updateSection(params.id, modelSection);
    }

     //Exponer punto para remover una prensa mediante su id    
     //IsParameterWithIdOfTable
    @Public()
    @Delete(':id')
    @ApiOperation({ summary: 'Borra la seccion por su identificador'})
    async deleteSection(@Param() params:ParameterValidation,@Res() res: Response){
        const response =   await   this.sectionService.deleteSection(params.id);
        if(!response) return res.status(HttpStatus.NOT_FOUND).json({"message":"registro no encontrado"});
        return res.status(HttpStatus.ACCEPTED).json({"message":"El registro seleccionado ha sido eliminado"})
     }
}
