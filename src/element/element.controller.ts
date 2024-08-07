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
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LevelService } from 'src/level/level.service';
import { unlinkSync, writeFileSync } from 'fs';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { TypeImage, TypeMaterial, TypePractice, TypeText, TypeVideo } from 'src/util/constants';
import { Response } from 'express';
import { StorageService } from 'src/storage/storage.service';

@ApiTags('Section Elements')
@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService,
    private readonly levelService: LevelService,
    private storageService: StorageService
  ) { }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtiene todos los elementos' })
  getElement(): any {
    return this.elementService.findAllElement();
  }

  @Public()
  @Get('/quiz/:id')
  @ApiOperation({ summary: 'Obtiene un elemento por su identificador' })
  async getExam(@Param() params: ParameterValidation): Promise<any> {
    return await this.elementService.findByIdElementByIdReferenceExamen(params.id);
  }

  @Public()
  @Get('/practice/:id')
  @ApiOperation({ summary: 'Obtiene un elemento por su identificador' })
  async getPractice(@Param() params: ParameterValidation): Promise<any> {
    return await this.elementService.findByIdElementByIdReferencePractice(params.id);
  }

  //Exponer punto para obtener 3 registros aleatorios
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un elemento por su identificador' })
  async getElementById(@Param() params: ParameterValidation): Promise<any> {
    const element  = await this.elementService.findByIdElementV2(params.id);
    if(element?.[0]?.url){
      element[0].url = await this.storageService.getLinks(element[0].url);
    }
    return element
  }


  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @Post('text')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo texto' })
  async saveElementText(@Body() modeElement: ElementTextValidation): Promise<any> {
    modeElement.type = TypeText;
    const { ...model } = modeElement;
    await this.elementService.saveElement(model);
  }

  @Public()
  @Post('material')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo material' })
  async saveElementMaterial(@Body() modelElement: ElementMaterialValidation): Promise<any> {
    try {
      modelElement.type = TypeMaterial
      const response = await this.storageService.uploadPfd(modelElement.document)
      if (response) {
        modelElement.url = response
        const { document, ...model } = modelElement;
        await this.elementService.saveElement(model);
      }
    }
    catch (err) {
      return err
    }
  }

  @Public()
  @Post('video')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo video' })
  async saveElementVideo(@Body() modeElement: ElementVideoAudioValidation): Promise<any> {
    modeElement.type = TypeVideo;
    const model = modeElement;
    await this.elementService.saveElement(model);
  }

  @Public()
  @Post('image')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo imagen' })
  async saveElementImage(@Body() modelElement: ElementImageValidation): Promise<any> {
    try {
      modelElement.type = TypeImage;
      const response = await this.storageService.upload(modelElement.image)
      if (response) {
        modelElement.url = response
        const { image, ...model } = modelElement;
        await this.elementService.saveElement(model);
      }
    }
    catch (error) {
      console.log(error)
      ExceptionErrorMessage(error);
    }
  }


  @Public()
  @Post('practice')
  @ApiOperation({ summary: 'Crea un nuevo elemento tipo practica' })
  async saveElementPractice(@Body() modeElement: ElementPracticeValidation): Promise<any> {
    modeElement.type = TypePractice;
    const { ...model } = modeElement;
    await this.elementService.savePractice(model);
  }

  //Exponer punto para almacenamiento de una nuevo registro de prensa
  @Public()
  @Put('text/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo texto por su identificador' })
  async updateElementText(@Body() modeElement: ElementTextValidation, @Param() params: ParameterValidation): Promise<any> {
    modeElement.type = TypeText;
    const { ...model } = modeElement;
    await this.elementService.updateElement(params.id, model);
  }

  @Public()
  @Put('material/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo material por su identificador' })
  async updateElementMaterial(@Body() modelElement: ElementMaterialValidation, @Param() params: ParameterValidation): Promise<any> {
    try {
      modelElement.type = TypeMaterial;
      const material = await this.elementService.findByIdElement(params.id)
      if (modelElement.document != "undefinied") {
        const response = await this.storageService.uploadPfd(modelElement.document)
        if (response) {
          modelElement.url = response
          await this.storageService.remove(material.url)
        }
      }
      const { document, ...model } = modelElement;
      await this.elementService.updateElement(params.id,model);
    } catch (error) {
      console.log(error)
      ExceptionErrorMessage(error);
    }
  }

  @Public()
  @Put('video/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo video por su identificador' })
  async updateElementVideo(@Body() modeElement: ElementVideoAudioValidation, @Param() params: ParameterValidation): Promise<any> {
    modeElement.type = TypeVideo;
    const model = modeElement;
    await this.elementService.updateElement(params.id, model);
  }

  @Public()
  @Put('image/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo imagen por su identificador' })
  async updateElementImage(@Body() modelElement: ElementImageValidation, @Param() params: ParameterValidation): Promise<any> {
    try {
      const material = await this.elementService.findByIdElement(params.id)
      if (modelElement.image != "undefinied") {
        const response = await this.storageService.uploadPfd(modelElement.image)
        if (response) {
          modelElement.url = response
          await this.storageService.remove(material.url)
        }
      }
      const { image, ...model } = modelElement;
      await this.elementService.updateElement(params.id,model);

    } catch (error) {

      ExceptionErrorMessage(error);
    }
  }

  @Public()
  @Put('practice/:id')
  @ApiOperation({ summary: 'Actualiza un elemento tipo practica por su identificador' })
  async updateElementPractice(@Body() modeElement: ElementPracticeUpdateValidation, @Param() params: ParameterValidation): Promise<any> {
    modeElement.type = TypePractice;
    const { ...model } = modeElement;
    await this.elementService.updatePractice(params.id, model);
  }



  //Exponer punto para actualizar un registro de prensa mediante su id
  @Public()
  @Put(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Actualiza un elemento  por su identificador'})
  updateElement(@Body() modeElement: ElementController, @Param() params: ParameterValidation): any {
    return this.elementService.updateElement(params.id, modeElement);
  }

  //Exponer punto para remover una prensa mediante su id    
  //IsParameterWithIdOfTable
  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un elemento  por su identificador' })
  async deleteElement(@Param() params: ParameterValidation, @Res() res: Response) {
    const response = await this.elementService.deleteElement(params.id);
    if (!response) return res.status(HttpStatus.NOT_FOUND).json({ "message": "registro no encontrado" });
    return res.status(HttpStatus.ACCEPTED).json({ "message": "El registro seleccionado ha sido eliminado" })
  }
}
