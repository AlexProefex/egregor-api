import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { Public } from 'src/auth/auth.controller';
import { ApiOperation } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { LevelValidation, LevelValidationUpdate } from 'src/database/validation/level-validation';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  //Exponer punto para obtener 3 registros aleatorios
  
}


