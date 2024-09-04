import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LicenseService } from './license.service';
import { Public } from 'src/auth/auth.controller';
import { LicenseValidation, LicenseValidationAssing, LicenseValidationStudent, LicenseValidationStudentReactive } from 'src/database/validation/license-validation';
import { StatusCreateLicense, TypeCompany, TypeStudent } from 'src/util/constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParameterValidation } from 'src/database/validation/parameter-validation';

@ApiTags('Licenses')
@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Public()
  @Post('company')
  @ApiOperation({ summary: 'Genera licencias para las empresas' })
  saveMultipleStudent(@Body() modelLicense:LicenseValidation):any{
    modelLicense.type = TypeCompany;
    modelLicense.status = StatusCreateLicense;
    return this.licenseService.saveLicenseCompany(modelLicense);
  }

  @Public()
  @Post('student')
  @ApiOperation({ summary: 'Crea y activa una licencia para el alumno b2c' })
  saveSingleStudent(@Body() modelLicense:LicenseValidationStudent):any{
    modelLicense.type = TypeStudent;
    return this.licenseService.saveLicenseStudent(modelLicense);
  }

  @Public()
  @Put('student/stop/:id')
  @ApiOperation({ summary: 'Pausa la licencia de un alumno' })
  stopLicenseStudent(@Param() params:ParameterValidation):any{
    return this.licenseService.updateLicenseStudent(params.id);
  }

  @Public()
  @Put('student/reactive/:id')
  @ApiOperation({ summary: 'Reactiva la licencia de un alumno' })
  reactiveLicenseStudent(@Param() params:ParameterValidation, @Body() model:LicenseValidationStudentReactive):any{
    return this.licenseService.reactiveLicenseStudent(params.id, model);
  }

  @Public()
  @Get('student/list')
  @ApiOperation({ summary: 'Lista los alumnos pertenecientes a Open School' })
  getStudents(){
    return this.licenseService.getListStundets()
  }

  @Public()
  @Get('company/list/:id')
  @ApiOperation({ summary: 'Lista las licencias de una empresa' })
  getListLicense(@Param() params:ParameterValidation){
    return this.licenseService.getListLicenseByCompany(params.id);
  }

  @Public()
  @ApiOperation({ summary: 'Lista todas las empresas' })
  @Get('company/list')
  getListCompany(){
    return this.licenseService.getListCompany()
  }

  
  @Public()
  @Get('company/student/:id')
  @ApiOperation({ summary: 'Lista los alumnos pertenecientes a una empresa' })
  getStudentCompany(@Param() params:ParameterValidation){
    return this.licenseService.getListStundetByCompany(params.id)
  }

  @Public()
  @Post('company/student/assign')
  @ApiOperation({ summary: 'Asigna la licencia de una empresa a un alumno' })
  assignLicenseOnStudent(@Body() modelLicense:LicenseValidationAssing){
     return this.licenseService.assingLicenseToStudent(modelLicense)
  }


  @Public()
  @Post('company/student/re-assign')
  @ApiOperation({ summary: 'Reasigna la licencia de una empresa a un alumno' })
  re_assingLicenseOnStudent(@Body() modelLicense:LicenseValidationAssing){
     return this.licenseService.re_assingLicenseToStudent(modelLicense)
  }

}
