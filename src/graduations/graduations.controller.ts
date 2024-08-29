import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GraduationsService } from './graduations.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';

@ApiTags('Graduations')
@Controller('graduations')
export class GraduationsController {
  constructor(private readonly graduationsService: GraduationsService) {}

 
  @Get()
  @Public()
  getGradutions() {
    return this.graduationsService.getGraduations();
  }

 
}
