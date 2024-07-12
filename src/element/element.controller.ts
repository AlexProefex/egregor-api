import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put } from '@nestjs/common';
import { ElementService } from './element.service';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { ElementValidation } from 'src/database/validation/element-validation';
import { ElementImageValidation } from 'src/database/validation/element-imagen-validation';
import { ElementTextValidation } from 'src/database/validation/element-text-validation';
import { ElementMaterialValidation } from 'src/database/validation/element-material-validation';
import { ElementVideoAudioValidation } from 'src/database/validation/element-video_audio-validation';
import { ElementPracticeUpdateValidation, ElementPracticeValidation } from 'src/database/validation/element-practice-validation';
import { ApiTags } from '@nestjs/swagger';
import { LevelService } from 'src/level/level.service';
import { unlinkSync, writeFileSync } from 'fs';
import { ExceptionErrorMessage } from 'src/validation/exception-error';

@ApiTags('Section Elements')
@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService,
    private readonly levelService: LevelService
  ) {}
  @Public()
  @Get()
  getElement():any{
      return this.elementService.findAllElement();
  }

  //Exponer punto para obtener 3 registros aleatorios
  @Public()
  @Get(':id')
  getElementById(@Param() params):any{
      return this.elementService.findByIdElement(params.id);
  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('text')
  async saveElementText(@Body() modeElement:ElementTextValidation):Promise<any>{
    modeElement.type = "text";
    const {levelId, ...model} = modeElement;
    await this.elementService.saveElement(model);
    return this.levelService.findLevel(levelId)
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('material')
  async saveElementMaterial(@Body() modeElement:ElementMaterialValidation):Promise<any>{
    try {
      modeElement.type = "material";
      const base64Data = Buffer.from(modeElement.document.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
      let mimeType2 = modeElement.document.match(/[^:/]\w+(?=;|,)/)[0];
      writeFileSync(`public/${name}.${mimeType2}`, base64Data)
      const url = `public/${name}.${mimeType2}`            
      if(url){
        modeElement.url = url;
        const {levelId,document, ...model} = modeElement;
        await this.elementService.saveElement(model);
        return this.levelService.findLevel(levelId)
        }
      }
      catch (err) {
        return err
    }
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('video')
  async saveElementVideo(@Body() modeElement:ElementVideoAudioValidation):Promise<any>{
    modeElement.type = "video";
    const {levelId, ...model} = modeElement;
    await this.elementService.saveElement(model);
    return this.levelService.findLevel(levelId)
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('image')
  async saveElementImage(@Body() modeElement:ElementImageValidation):Promise<any>{
    try {
      let level = null
      modeElement.type = "image";
      const base64Data = Buffer.from(modeElement.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
      let mimeType2 = modeElement.image.match(/[^:/]\w+(?=;|,)/)[0];
      writeFileSync(`public/${name}.${mimeType2}`, base64Data)
      const url = `public/${name}.${mimeType2}`            
      if(url){
        modeElement.url = url;
        const {levelId,image, ...model} = modeElement;
        level = levelId
        await this.elementService.saveElement(model);
      }
      return this.levelService.findLevel(level)
      }
      catch (error) {
        console.log(error)
        ExceptionErrorMessage(error); 
    }

  }


  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('practice')
  async saveElementPractice(@Body() modeElement:ElementPracticeValidation):Promise<any>{
    modeElement.type = "practice";
    const {levelId, ...model} = modeElement;
    await this.elementService.savePractice(model);
    return await this.levelService.findLevel(levelId)

    
  }




  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('text/:id')
  async updateElementText(@Body() modeElement:ElementTextValidation, @Param() params):Promise<any>{
    modeElement.type = "text";
    const {levelId, ...model} = modeElement;
    await this.elementService.updateElement(params.id,model);
    return this.levelService.findLevel(levelId)

  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('material/:id')
  async updateElementMaterial(@Body() modeElement:ElementMaterialValidation, @Param() params):Promise<any>{
    try {
      modeElement.type = "material";
      const material = await this.elementService.findByIdElement(params.id)
      if(modeElement.document != "undefinied"){
        const base64Data = Buffer.from(modeElement.document.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
        let mimeType2 = modeElement.document.match(/[^:/]\w+(?=;|,)/)[0];
        writeFileSync(`public/${name}.${mimeType2}`, base64Data)
        const url = `public/${name}.${mimeType2}`            
        if(url){
          if(material.url){
            unlinkSync(`${material.url}`);
          }
          modeElement.url = url;
        }
      }
      const {levelId,document, ...model} = modeElement;
      await this.elementService.updateElement(params.id,model);
      return this.levelService.findLevel(levelId)
    } catch (error) {
      ExceptionErrorMessage(error); 
    }
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('video/:id')
  async updateElementVideo(@Body() modeElement:ElementVideoAudioValidation, @Param() params):Promise<any>{
    modeElement.type = "video";
    const {levelId, ...model} = modeElement;
    await this.elementService.updateElement(params.id,model);
    return this.levelService.findLevel(levelId)

  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('image/:id')
  async updateElementImage(@Body() modeElement:ElementImageValidation, @Param() params):Promise<any>{
    try {
      modeElement.type = "image";
      const material = await this.elementService.findByIdElement(params.id)
      if(modeElement.image != "undefinied"){
        const base64Data = Buffer.from(modeElement.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
        let mimeType2 = modeElement.image.match(/[^:/]\w+(?=;|,)/)[0];
        writeFileSync(`public/${name}.${mimeType2}`, base64Data)
        const url = `public/${name}.${mimeType2}`            
        if(url){
          if(material.url){
            unlinkSync(`${material.url}`);
          }
          modeElement.url = url;
        }
      }
      const {levelId,image, ...model} = modeElement;
      await this.elementService.updateElement(params.id,model);
      return this.levelService.findLevel(levelId)
    } catch (error) {
      
      ExceptionErrorMessage(error); 
    }

  }
  
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('practice/:id')
  async updateElementPractice(@Body() modeElement:ElementPracticeUpdateValidation,@Param() params):Promise<any>{
    modeElement.type = "practice";
    const {levelId, ...model} = modeElement;
    await this.elementService.updatePractice(params.id,model);
    return await this.levelService.findLevel(levelId)
  }



  //Exponer punto para actualizar un registro de prensa mediante su id
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put(':id')
  updateElement(@Body() modeElement:ElementController, @Param() params):any{
      return this.elementService.updateElement(params.id, modeElement);
  }

   //Exponer punto para remover una prensa mediante su id    
   //IsParameterWithIdOfTable
  @Public()
  @Delete(':id')
  deleteElement(@Param() params:any){
       return this.elementService.deleteElement(params.id);
   }
}
