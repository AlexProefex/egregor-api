import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { UnitValidation } from 'src/database/validation/unit-validation';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';

@ApiTags('Level Units')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtiene todas las unidades'})
  getUnit():any{
      return this.unitService.findAllUnit();
  }

  //Exponer punto para obtener 3 registros aleatorios
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene las unidades por su identificador'})
  getUnitById(@Param() params:ParameterValidation):any{
      return this.unitService.findUnitById(params.id);
  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @ApiOperation({ summary: 'Almacena una nueva unidad'})
  @Post()
  saveUnit(@Body() modelUnit:UnitValidation):any{
      return this.unitService.saveUnit(modelUnit);
  }

  //Exponer punto para actualizar un registro de prensa mediante su id
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una nueva unidad por su identificador'})
  updateUnit(@Body() modelUnit:UnitValidation, @Param() params:ParameterValidation):any{
      return this.unitService.updateUnit(params.id, modelUnit);
  }

   //Exponer punto para remover una prensa mediante su id    
   //IsParameterWithIdOfTable
  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina la unidad por su identificador'})
  deleteUnit(@Param() params:ParameterValidation){
       return this.unitService.deleteUnit(params.id);
   }
}
