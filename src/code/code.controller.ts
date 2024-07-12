import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, HttpStatus } from '@nestjs/common';
import { CodeService } from './code.service';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { CodeValidationChangePassword, CodeValidationSend, CodeValidationVerify } from 'src/database/validation/code-validation';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Security Code')
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('/generate-code')
  generateCode(@Body() modelCode:CodeValidationSend):any{
      return this.codeService.saveCode(modelCode);
  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('/validate-code')
  async validateCode(@Body() modelCode:CodeValidationVerify, @Res()  response: Response):Promise<any>{
     const res = await this.codeService.validateCode(modelCode);
     if(res){
      return response.status(HttpStatus.OK).json({});
     }
     return response.status(HttpStatus.BAD_REQUEST).json({});

  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('/change-password')
   changePassword(@Body() modelCode:CodeValidationChangePassword):any{
     return this.codeService.updatePassword(modelCode);
  }
  
}
