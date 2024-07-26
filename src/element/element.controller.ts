import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put, Res, HttpStatus } from '@nestjs/common';
import { ElementService } from './element.service';
import { Public } from 'src/auth/auth.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { ElementValidation } from 'src/database/validation/element-validation';
import { ElementImageValidation } from 'src/database/validation/element-imagen-validation';
import { ElementTextValidation } from 'src/database/validation/element-text-validation';
import { ElementMaterialValidation } from 'src/database/validation/element-material-validation';
import { ElementVideoAudioValidation } from 'src/database/validation/element-video_audio-validation';
import { ElementPracticeUpdateValidation, ElementPracticeValidation } from 'src/database/validation/element-practice-validation';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LevelService } from 'src/level/level.service';
import { unlinkSync, writeFileSync } from 'fs';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { TypeImage, TypeMaterial, TypePractice, TypeText, TypeVideo } from 'src/util/constants';
import { Response } from 'express';

@ApiTags('Section Elements')
@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService,
    private readonly levelService: LevelService
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtiene todos los elementos'})
  getElement():any{
      return this.elementService.findAllElement();
  }

  //Exponer punto para obtener 3 registros aleatorios
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un elemento por su identificador'})
  getElementById(@Param() params:ParameterValidation):any{
      return this.elementService.findByIdElement(params.id);
  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('text')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo texto'})
  async saveElementText(@Body() modeElement:ElementTextValidation):Promise<any>{
    modeElement.type = TypeText;
    const {levelId, ...model} = modeElement;
    await this.elementService.saveElement(model);
    return this.levelService.findLevel(levelId)
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('material')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo material'})
  async saveElementMaterial(@Body() modeElement:ElementMaterialValidation):Promise<any>{
    try {
      modeElement.type = TypeMaterial;
      const base64Data = Buffer.from(modeElement.document.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
      let mimeType2 = modeElement.document.match(/[^:/]\w+(?=;|,)/)[0];
      writeFileSync(`public/${name}.${mimeType2}`, base64Data)
      const url = `http://apiegregor.proefexperu.com/${name}.${mimeType2}`            
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
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo video'})
  async saveElementVideo(@Body() modeElement:ElementVideoAudioValidation):Promise<any>{
    modeElement.type = TypeVideo;
    const {levelId, ...model} = modeElement;
    await this.elementService.saveElement(model);
    return this.levelService.findLevel(levelId)
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Post('image')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo imagen'})
  async saveElementImage(@Body() modeElement:ElementImageValidation):Promise<any>{
    try {
      let level = null
      modeElement.type = TypeImage;
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
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo practica'})
  async saveElementPractice(@Body() modeElement:ElementPracticeValidation):Promise<any>{
    modeElement.type = TypePractice;
    const {levelId, ...model} = modeElement;
    await this.elementService.savePractice(model);
    return await this.levelService.findLevel(levelId)

    
  }




  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('text/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo texto por su identificador'})
  async updateElementText(@Body() modeElement:ElementTextValidation, @Param() params):Promise<any>{
    modeElement.type = TypeText;
    const {levelId, ...model} = modeElement;
    await this.elementService.updateElement(params.id,model);
    return this.levelService.findLevel(levelId)

  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('material/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo material por su identificador'})
  async updateElementMaterial(@Body() modeElement:ElementMaterialValidation, @Param() params:ParameterValidation):Promise<any>{
    try {
      modeElement.type = TypeMaterial;
      const material = await this.elementService.findByIdElement(params.id)
      if(modeElement.document != "undefinied"){
        const base64Data = Buffer.from(modeElement.document.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
        let mimeType2 = modeElement.document.match(/[^:/]\w+(?=;|,)/)[0];
        writeFileSync(`public/${name}.${mimeType2}`, base64Data)
        let url = `http://apiegregor.proefexperu.com/api/${name}.${mimeType2}` 
        if(url){
          if(material.url){
            const document = material.url.replace("http://apiegregor.proefexperu.com/","public/")
            unlinkSync(`${document}`);
          }
          modeElement.url = url;
        }
      }
      const {levelId,document, ...model} = modeElement;
      await this.elementService.updateElement(params.id,model);
      return this.levelService.findLevel(levelId)
    } catch (error) {
      console.log(error)
      ExceptionErrorMessage(error); 
    }
  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('video/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo video por su identificador'})
  async updateElementVideo(@Body() modeElement:ElementVideoAudioValidation, @Param() params:ParameterValidation):Promise<any>{
    modeElement.type = TypeVideo;
    const {levelId, ...model} = modeElement;
    await this.elementService.updateElement(params.id,model);
    return this.levelService.findLevel(levelId)

  }

  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put('image/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo imagen por su identificador'})
  async updateElementImage(@Body() modeElement:ElementImageValidation, @Param() params:ParameterValidation):Promise<any>{
    try {
      modeElement.type = TypeImage;
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
  @ApiOperation({ summary: 'Actualiza un elemento tipo practica por su identificador'})
  async updateElementPractice(@Body() modeElement:ElementPracticeUpdateValidation,@Param() params:ParameterValidation):Promise<any>{
    modeElement.type = TypePractice;
    const {levelId, ...model} = modeElement;
    await this.elementService.updatePractice(params.id,model);
    return await this.levelService.findLevel(levelId)
  }



  //Exponer punto para actualizar un registro de prensa mediante su id
  @Public()
  @UseInterceptors(FileInterceptor(''))
  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un elemento  por su identificador'})
  updateElement(@Body() modeElement:ElementController, @Param() params:ParameterValidation):any{
      return this.elementService.updateElement(params.id, modeElement);
  }

   //Exponer punto para remover una prensa mediante su id    
   //IsParameterWithIdOfTable
  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un elemento  por su identificador'})
  async deleteElement(@Param() params:ParameterValidation,@Res() res: Response){
      const response =   await  this.elementService.deleteElement(params.id);
      if(!response) return res.status(HttpStatus.NOT_FOUND).json({"message":"registro no encontrado"});
      return res.status(HttpStatus.ACCEPTED).json({"message":"El registro seleccionado ha sido eliminado"})
     
   }
}
