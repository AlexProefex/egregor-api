import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { LevelService } from './level.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.controller';
import { LevelValidation, LevelValidationUpdate } from 'src/database/validation/level-validation';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';

@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

    //Exponer punto para obtener 3 registros aleatorios
    @Public()
    @Get('content/:id')
    @ApiOperation({ summary: 'Obtiene el esquema de un nivel'})
    getLevelAll(@Param() params:ParameterValidation):any{
        return this.levelService.findLevel(params.id);
    }

    //Exponer punto para el listado de todas los registro de prensa 
    @Public()
    @Get('stadistic/count')
    @ApiOperation({ summary: 'Obtiene las estadisticas del nivel'})
    getCountLevel():any{
        return this.levelService.getCountLevel();
    }
    //Exponer punto para el listado de todas los registro de prensa 
    @Public()
    @Get()
    @ApiOperation({ summary: 'Obtiene todos los niveles'})
    getLevel():any{
        return this.levelService.findAllLevel();
    }
    

    //Exponer punto para obtener 3 registros aleatorios
    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'Obtiene los datos del nivel por su identificador'})
    getLevelById(@Param() params:ParameterValidation):any{
        return this.levelService.findById(params.id);
    }


    //Exponer punto para almacenamiento de una nuevo registro de prensa
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Post()
    @ApiOperation({ summary: 'Almacena un nuevo nivel'})
    saveLevel(@Body() modelevel:LevelValidation):any{
        return this.levelService.saveLevel(modelevel);
    }

    //Exponer punto para actualizar un registro de prensa mediante su id
    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Put(':id')
    @ApiOperation({ summary: 'Actuliza el nivel mediante su identificador'})
    updateLevel(@Body() modelevel:LevelValidationUpdate, @Param() params:ParameterValidation):any{
        return this.levelService.updateLevel(params.id, modelevel);
    }

     //Exponer punto para remover una prensa mediante su id    
     //IsParameterWithIdOfTable
    /*@Public()
    @Delete(':id')
    deleteLevel(@Param() params:any){
         return this.levelService.deleteLevel(params.id);
     }*/
}
