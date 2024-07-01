import { Body, Controller, Get, Param, Post, Put, UseInterceptors,Delete, UploadedFiles, Headers, Injectable, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
//import { IsParameterWithIdOfTable } from 'src/database/validation/parameter-validation';
import { UserValidation } from 'src/database/validation/user-validation';
import { Public } from 'src/auth/auth.controller';
import { SkipThrottle } from '@nestjs/throttler';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { token } from './token.service';


@SkipThrottle()
@Controller('user')
export class UserController {
    constructor(private userService:UserService,

    ){
        
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
    @UseInterceptors(
        FilesInterceptor('file', 20, {
          storage: diskStorage({
            destination:  './public',
            filename:  function (req, file, cb) {
                return cb(null, `${Date.now()}${extname(file.originalname)}`);
              }
          }),
        //   fileFilter: imageFileFilter,
        }),
      )
    EditarPerfil(@UploadedFiles()  file: Express.Multer.File,@Body() modelUser:UserValidation, @Headers('Authorization') auth: string):any  {
        const response = [];
        console.log(modelUser)
        try{
            const result = this.userService.updateUser(modelUser, file[0].path, auth)
            return {
                statusCode: 200,
                "data": result,
                "error": ""}

            /*return {
                statusCode: 200,
                datos: file[0].filename,
                datos3: file,
                prueba: "fsfsd",
                datos2: file[0].path,
            };*/
        }
        catch(err){         
            return {
            statusCode: 500,
            "data": "",
            "error":err};


        }



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
      }


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
}
