import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { Public } from 'src/auth/auth.controller';
import { ApiOperation } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //Exponer punto para obtener 3 registros aleatorios
  @Public()
  @Get('content/:id')
  @ApiOperation({ summary: 'Obtiene el esquema de un nivel'})
  getLevelAll(@Param() params:ParameterValidation):any{
      return this.groupService.findLevel(params.id);
  }

  //Exponer punto para el listado de todas los registro de prensa 
  @Public()
  @Get('stadistic/count')
  @ApiOperation({ summary: 'Obtiene las estadisticas del nivel'})
  getCountLevel():any{
      return this.groupService.getCountLevel();
  }
  //Exponer punto para el listado de todas los registro de prensa 
  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtiene todos los niveles'})
  getLevel():any{
      return this.groupService.findAllLevel();
  }
  

  //Exponer punto para obtener 3 registros aleatorios
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene los datos del nivel por su identificador'})
  getLevelById(@Param() params:ParameterValidation):any{
      return this.groupService.findById(params.id);
  }


  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @Post()
  @ApiOperation({ summary: 'Almacena un nuevo nivel'})
  saveLevel(@Body() modelevel:LevelValidation):any{
      return this.groupService.saveLevel(modelevel);
  }

  //Exponer punto para actualizar un registro de prensa mediante su id
  @Public()
  @Put(':id')
  @ApiOperation({ summary: 'Actuliza el nivel mediante su identificador'})
  updateLevel(@Body() modelevel:LevelValidationUpdate, @Param() params:ParameterValidation):any{
      return this.groupService.updateLevel(params.id, modelevel);
  }

   //Exponer punto para remover una prensa mediante su id    
   //IsParameterWithIdOfTable
  /*@Public()
  @Delete(':id')
  deleteLevel(@Param() params:any){
       return this.levelService.deleteLevel(params.id);
   }*/
}


