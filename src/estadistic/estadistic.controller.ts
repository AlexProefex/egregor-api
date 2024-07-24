import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadisticService } from './estadistic.service';

@Controller('estadistic')
export class EstadisticController {
  constructor(private readonly estadisticService: EstadisticService) {}
/*
  @Post()
  create(@Body() createEstadisticDto: CreateEstadisticDto) {
    return this.estadisticService.create(createEstadisticDto);
  }

  @Get()
  findAll() {
    return this.estadisticService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadisticService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadisticDto: UpdateEstadisticDto) {
    return this.estadisticService.update(+id, updateEstadisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadisticService.remove(+id);
  }
    */
}
