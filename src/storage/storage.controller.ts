import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StorageService } from './storage.service';
import { writeFileSync } from 'fs';
import { Public } from 'src/auth/auth.controller';


@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
 
  @Public()
  @Post('test')
  async EditarPerfil(@Body() modelUser: any): Promise<any> {
      try {
          if(modelUser.image != "undefined"){
              const base64Data = Buffer.from(modelUser.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
              const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
              let mimeType2 = modelUser.image.match(/[^:/]\w+(?=;|,)/)[0];
              writeFileSync(`public/${name}.${mimeType2}`, base64Data)
              const path = `public/${name}.${mimeType2}`            
              this.storageService.uploadFileGroup(path)
          }
          return {
              statusCode: 200,
              "data":"",
              "error": ""
          }
      }
      catch (err) {
          return {
              statusCode: 500,
              "data": "",
              "error": err
          };
      }
  }

}
