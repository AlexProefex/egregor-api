import { Controller, Body, Post,Get, UseGuards, Request, HttpCode, HttpStatus, Response, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { UserValidation } from 'src/database/validation/user-validation';
import { LoginValidation } from 'src/database/validation/login-validation';
import { SkipThrottle } from '@nestjs/throttler';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
    ){}
    //Exponer punto para el registro de usuarios
    @Public()
    @Post('register')
    registerUser(@Body() modelUser):any{
        return this.authService.saveUser(modelUser);
    }

    //Exponer punto para el ingreso de usuaros y generacion de token
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    loginUser(@Request() req,@Body() modelUser:LoginValidation){
        return this.authService.loginPassport(req.user);
    }
/*
    @Public()
    @Post('file')
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
      uploadMultipleFiles(@UploadedFiles()  file: Express.Multer.File) {
        const response = [];

    
       /* files.forEach(file => {
          const fileReponse = {
            filename: file.filename,
          };
          response.push(fileReponse);
        });--
      
        return {
            statusCode: 200,
            datos: file[0].filename,
            datos3: file,
            prueba: "fsfsd",
            datos2: file[0].path,
        };
      }*/
}


