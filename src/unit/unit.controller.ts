import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { UnitValidation } from 'src/database/validation/unit-validation';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Level Units')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Public()
  @Get()
  getLevel():any{
      return this.unitService.findAllUnit();
  }

  //Exponer punto para obtener 3 registros aleatorios
  @Public()
  @Get(':id')
  getLevelById(@Param() params):any{
      return this.unitService.findUnitById(params.id);
  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post()
  saveLevel(@Body() modelUnit:UnitValidation):any{
      return this.unitService.saveUnit(modelUnit);
  }

  //Exponer punto para actualizar un registro de prensa mediante su id
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put(':id')
  updateLevel(@Body() modelUnit:UnitValidation, @Param() params):any{
      return this.unitService.updateUnit(params.id, modelUnit);
  }

   //Exponer punto para remover una prensa mediante su id    
   //IsParameterWithIdOfTable
  @Public()
  @Delete(':id')
  deleteLevel(@Param() params:any){
       return this.unitService.deleteUnit(params.id);
   }
}
