import { Body, Controller, Get, Post, UseInterceptors, Headers, Res, HttpStatus, Param, Put, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
//import { IsParameterWithIdOfTable } from 'src/database/validation/parameter-validation';
import { ChangePasswordValidation, CompanyValidation, TeacherValidation, UserValidation } from 'src/database/validation/user-validation';
import { Public } from 'src/auth/auth.controller';
import { SkipThrottle } from '@nestjs/throttler';
import path, { extname } from 'path';
import { writeFileSync, unlinkSync } from 'fs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { Roles } from 'src/util/roles.decorator';
import { Role } from 'src/util/rol.enum';
import { PermissionsGuard } from 'src/middleware/permissions.guard';
import { TypeCompany, TypeTeacher } from 'src/util/constants';

/*Roles
editor de contenido
head teacher
profesor
alumno
administrador
recursos humanos
qa
*/
//@ApiBearerAuth()
@SkipThrottle()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService,
    ) { }

    @Public()
    @Get('profile-all')
    @ApiOperation({ summary: 'Obtiene los datos del perfil de un usuario con mas campos' })
    getUserProfileAll(@Headers('Authorization') auth: string): any {
        return this.userService.newCamps(auth);
    }





    //@ApiResponse({type:UserValidation})
    @Public()
    @Get('profile')
    @ApiOperation({ summary: 'Obtiene los datos del perfil de un usuario' })
    getUserProfile(@Headers('Authorization') auth: string): any {
        return this.userService.findUser(auth);
    }

    //@ApiResponse({type:UserValidation})
  
    

    //@ApiResponse({type:UserValidation})
    @Public()
    @Get('detail/:id')
    @ApiOperation({ summary: 'Obtiene los datos del perfil de un profesor' })
    getUserTeacher(@Param() param:ParameterValidation): any {
        return this.userService.findUserById(param.id);
    }



    @Public()
    @Post('register/teacher')
    @ApiOperation({ summary: 'Permite el registro de un usuario con rol profesor' })
    registerTeacher(@Body() modelUser:TeacherValidation):any{
        modelUser.rol = TypeTeacher;
        return this.userService.saveUserGeneral(modelUser);
    }

    @Public()
    @Put('register/teacher/:id')
    @ApiOperation({ summary: 'Permite la actualizacion de un usuario con rol profesor' })
    updateTeacher(@Body() modelUser:TeacherValidation, @Param() params):any{
        modelUser.rol = TypeTeacher;
        return this.userService.updateUserGeneral(modelUser, params.id);
    }

    //@Roles(Role.Admin,Role.User)
    @Public()
    @Post('register/company')
    @ApiOperation({ summary: 'Permite el registro de un usuario con rol empresa'})
    //@UseGuards(PermissionsGuard)
   // @SetMetadata('permissions',['read:cats'])
    registerCompany(@Body() modelUser:CompanyValidation):any{
        modelUser.rol = TypeCompany;
        return this.userService.saveUserGeneral(modelUser);
        
    }

    @Public()
    @Put('register/company/:id')
    @ApiOperation({ summary: 'Permite la actualizacion de un usuario con rol empresa'})
    updateCompany(@Body() modelUser:CompanyValidation, @Param() params):any{
        modelUser.rol = TypeCompany;
        return this.userService.updateUserGeneral(modelUser, params.id);
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
    @ApiOperation({ summary: 'Permite la actualizacion de un perfil de un usuario'})
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
    @ApiOperation({ summary: 'Permite el cambio de contraseña de un usuario'})
    async updatePassword(@Body() model:ChangePasswordValidation, @Headers('Authorization') auth: string, @Res() res: Response):Promise<any>{
       const response = await this.userService.validatePassword(model,auth) 
        if(!response)
            return res.status(HttpStatus.BAD_REQUEST).json({});
        const user = await this.userService.updatePassword(model,auth );
        return res.status(HttpStatus.OK).json({...user})
    }
}

