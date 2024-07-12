import { Body, Controller, Get, Param, Post, Put, UseInterceptors, Delete, UploadedFiles, Headers, Injectable, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
//import { IsParameterWithIdOfTable } from 'src/database/validation/parameter-validation';
import { ChangePasswordValidation, UserValidation } from 'src/database/validation/user-validation';
import { Public } from 'src/auth/auth.controller';
import { SkipThrottle } from '@nestjs/throttler';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { token } from './token.service';
import { writeFileSync, unlinkSync } from 'fs';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { use } from 'passport';
import { Response } from 'express';


@SkipThrottle()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService,
    ) { }

    @Public()
    @Get('profile')
    getUserProfile(@Headers('Authorization') auth: string): any {
        return this.userService.findUser(auth);
    }


    //Exponer punto para el listado de todas los usuarios 
    /*@Get()
    getUser():any{
        return this.userService.findAllUsers();
    }*/

    //Exponer punto para el listado de todas los usuarios activos
    /* @Public()
     @Get('active')
     getUserActive():any{
         return this.userService.findAllUsersActive();
     }*/

    //Exponer punto para almacenamiento de un nuevo usuario
    /*@UseInterceptors(FileInterceptor(''))
    @Post()
    saveUser(@Body() modelUser:UserValidation):any{
        return this.userService.saveUser(modelUser);
    }*/
    @Public()
    @Post('update-perfil')
    async EditarPerfil(@Body() modelUser: UserValidation, @Headers('Authorization') auth: string): Promise<any> {
        try {
            if(modelUser.image != "undefined"){
                const user =  await this.getUserProfile(auth);
                const base64Data = Buffer.from(modelUser.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
                let mimeType2 = modelUser.image.match(/[^:/]\w+(?=;|,)/)[0];
                writeFileSync(`public/${name}.${mimeType2}`, base64Data)
                const path = `public/${name}.${mimeType2}`            
                if(path){
                    if(user.avatar){
                        unlinkSync(`${user.avatar}`);
                    }
                }
            }
            const {image, ... updateUser} = modelUser
            const result = await this.userService.updateUser(updateUser,path, auth)
            return {
                statusCode: 200,
                "data":{...result},
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


//    @Public()
 //   @Post('update-perfil2')
 //   EditarPerfil2(@Body() modelUser: any): any {

        /*var file = new File([modelUser.file], `my_image${new Date()}.jpeg`, {
            type: "image/jpeg"
          });
     */

        //const file = new File([modelUser.file],'image.jpg')

        //const buffer = Buffer.alloc(modelUser.file.length, modelUser.file);
        /*writeFile('public/sample.jpg', modelUser.file, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });*/

        
      /*  modelUser.data.forEach(datos => {
            const base64Data = Buffer.from(datos.file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
            let mimeType2 = datos.file.match(/[^:/]\w+(?=;|,)/)[0];
            writeFileSync(`public/${name}.${mimeType2}`, base64Data)
            datos.path = `public/${name}.${mimeType2}`

        });

        console.log(modelUser)
*/


        /*var file = new File([modelUser.file], "image.png", {lastModified: 1534584790000});

        //const myFile = this.blobToFile(modelUser.file, "my-image.png");
        //console.log(file)
        writeFile('public/image.png',modelUser.file, err => {
            if (err) {
              console.error(err);
            } else {
              // file written successfully
            }
          })
          */
   // }
/*

    @UseInterceptors(
        FilesInterceptor('file', 20, {
            storage: diskStorage({
                destination: './public',
                filename: function (req, file, cb) {
                    return cb(null, `${Date.now()}${extname(file.originalname)}`);
                }
            }),
            //   fileFilter: imageFileFilter,
        }),
    )
    uploadFile(@UploadedFiles() file: Express.Multer.File): any {
        try {
            return file[0].path;
        }
        catch (err) {
            return "error";
        }
    }
*/


    //return HttpServiceInterceptor[0];


    /* files.forEach(file => {
       const fileReponse = {
         filename: file.filename,
       };
       response.push(fileReponse);
     });*/

    /*return {
        statusCode: 200,
        datos: file[0].filename,
        datos3: file,
        prueba: "fsfsd",
        datos2: file[0].path,
    };*/



    /*

    //Exponer punto para actualizar un usuario
    @UseInterceptors(FileInterceptor(''))
    @Put(':id')
    updateUser(@Body() modelUser:UserValidation, @Param() params):any{
        return this.userService.updateUser(params.id, modelUser);
    }

    //Exponer punto para remover un usuario mediante su id    
    @Delete(':id')
    deletePartNership(@Param() params)
    //:IsParameterWithIdOfTable)
    {
        return this.userService.deleteUser(params.id);
    }*/


    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Post('change-password')
    async updatePassword(@Body() model:ChangePasswordValidation, @Headers('Authorization') auth: string, @Res() res: Response):Promise<any>{
       const response = await this.userService.validatePassword(model,auth) 
        if(!response)
            return res.status(HttpStatus.BAD_REQUEST).json({});
        const user = await this.userService.updatePassword(model,auth );
        return res.status(HttpStatus.OK).json({...user})
    }
}

