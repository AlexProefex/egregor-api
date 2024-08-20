import { Body, Controller, Get, Post, UseInterceptors, Headers, Res, HttpStatus, Param, Put, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
//import { IsParameterWithIdOfTable } from 'src/database/validation/parameter-validation';
import { ChangePasswordValidation, CompanyValidation, CompanyValidationUpdate, StudentValidation, StudentValidationUpdate, TeacherValidation, TeacherValidationUpdate, UserValidation } from 'src/database/validation/user-validation';
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
import { TypeCompany, TypeStudent, TypeTeacher } from 'src/util/constants';
import { StorageService } from 'src/storage/storage.service';

/*Roles
editor de contenido
head teacher
profesor
alumno
administrador
recursos humanos
qa
qqqqqqq
*/
//@ApiBearerAuth()
@SkipThrottle()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        private storageService: StorageService
    ) { }

    @Public()
    @Get('profile-all')
    @ApiOperation({ summary: 'Obtiene los datos del perfil de un usuario con mas campos' })
    async getUserProfileAll(@Headers('Authorization') auth: any): Promise<any> {

        const user = await this.userService.newCamps(auth);
        if (user.avatar || user.avatar == "undefined") {
            const image = await this.storageService.getLinks(user.avatar)
            user.avatar = image;
        }
        return user;


    }


    //@ApiResponse({type:UserValidation})
    @Public()
    @Get('profile')
    @ApiOperation({ summary: 'Obtiene los datos del perfil de un usuario' })
    async getUserProfile(@Headers('Authorization') auth: any): Promise<any> {
        const user = await this.userService.findUser(auth);
        if (user.avatar || user.avatar == "undefined") {
            const image = await this.storageService.getLinks(user.avatar)
            user.avatar = image;
        }
        return user;
    }

    //@ApiResponse({type:UserValidation})

    //@ApiResponse({type:UserValidation})
    @Public()
    @Get('detail/:id')
    @ApiOperation({ summary: 'Obtiene los datos de un perfil' })
    async getUserTeacher(@Param() param: ParameterValidation, @Res() res: Response): Promise<any> {
        const user = await this.userService.findUserById(param.id);
        if (user) {
            if (user.avatar) {
                user.avatar = await this.storageService.getLinks(user.avatar)
            }
            return res.status(HttpStatus.OK).json({ ...user })
        }
        return res.status(HttpStatus.NOT_FOUND).json({});
    }


    @Public()
    @Get('teachers-short')
    @ApiOperation({ summary: 'Obtiene el nombre e id de los profesores' })
    async getTeachersShort(): Promise<any> {
        return await this.userService.findUserTeachers()

    }
    
    @Public()
    @Get('teachers')
    @ApiOperation({ summary: 'Obtiene los registros de los profesores' })
    async getTeachers(@Res() res: Response): Promise<any> {
        const user = await this.userService.findUserTeachers()
        return res.status(HttpStatus.OK).json([...user])

    }

    

    @Public()
    @Get('student/:id')
    @ApiOperation({ summary: 'Obtiene el detalle de un alumno' })
    async getStudent(@Param() params: ParameterValidation, @Res() res: Response): Promise<any> {
        const user = await this.userService.findStudent(params.id)
        if (user) {
            return res.status(HttpStatus.OK).json({ ...user })
        }
        return res.status(HttpStatus.NOT_FOUND).json({})

    }

    @Public()
    @Get('students')
    @ApiOperation({ summary: 'Obtiene los registros de los estudiantes' })
    async getStudents(@Res() res: Response): Promise<any> {
        const user = await this.userService.findStudents()
        return res.status(HttpStatus.OK).json(user)

    }

    @Public()
    @Get('companys-filtered')
    @ApiOperation({ summary: 'Obtiene los registros de los empresas' })
    async getCompanysFiltered(@Res() res: Response): Promise<any> {
        const user = await this.userService.findUserCompanysFiltered()
        return res.status(HttpStatus.OK).json([...user])

    }

    @Public()
    @Get('companys')
    @ApiOperation({ summary: 'Obtiene los registros de los empresas' })
    async getCompanys(@Res() res: Response): Promise<any> {
        const user = await this.userService.findUserCompanys()
        return res.status(HttpStatus.OK).json([...user])
    }


    @Public()
    @Post('register/student')
    @ApiOperation({ summary: 'Permite el registro de un usuario con rol estudiante' })
    registerStudent(@Body() modelUser: StudentValidation): any {
        modelUser.rol = TypeStudent;
        return this.userService.saveUserGeneral(modelUser);
    }

    @Public()
    @Post('register/teacher')
    @ApiOperation({ summary: 'Permite el registro de un usuario con rol profesor' })
    registerTeacher(@Body() modelUser: TeacherValidation): any {
        modelUser.rol = TypeTeacher;
        return this.userService.saveUserTeacher(modelUser);
    }

    @Public()
    @Put('register/teacher/:id')
    @ApiOperation({ summary: 'Permite la actualizacion de un usuario con rol profesor' })
    updateTeacher(@Body() modelUser: TeacherValidationUpdate, @Param() params: ParameterValidation): any {
        modelUser.rol = TypeTeacher;
        return this.userService.updateTeacher(modelUser, params.id);
    }

    //@Roles(Role.Admin,Role.User)
    @Public()
    @Post('register/company')
    @ApiOperation({ summary: 'Permite el registro de un usuario con rol empresa' })
    //@UseGuards(PermissionsGuard)
    // @SetMetadata('permissions',['read:cats'])
    registerCompany(@Body() modelUser: CompanyValidation): any {
        modelUser.rol = TypeCompany;
        return this.userService.saveUserGeneral(modelUser);

    }

    @Public()
    @Put('register/company-update/:id')
    @ApiOperation({ summary: 'Permite la actualizacion de un usuario con rol empresa' })
    updateCompany(@Body() modelUser: CompanyValidationUpdate, @Param() params: ParameterValidation): any {
        modelUser.rol = TypeCompany;
        return this.userService.updateUserGeneral(modelUser, params.id);
    }

    @Public()
    @Put('register/student-update/:id')
    @ApiOperation({ summary: 'Permite la actualizacion de un usuario con rol estudiante' })
    updateStudent(@Body() modelUser: StudentValidationUpdate, @Param() params: ParameterValidation): any {
        modelUser.rol = TypeStudent;
        return this.userService.updateUserGeneral(modelUser, params.id);
    }

    @Public()
    @ApiOperation({ summary: 'Permite la actualizacion de un perfil de un usuario' })
    @Post('update-perfil')
    async EditarPerfil(@Body() modelUser: UserValidation, @Headers('Authorization') auth: string, @Res() res: Response): Promise<any> {
        console.log(modelUser)
        let success = null
        try {
            if (modelUser.image != "undefined") {
                success = await this.storageService.upload(modelUser.image)
                console.log(success)
            }
            const { image, ...updateUser } = modelUser
            await this.userService.updateUser(updateUser, success, auth)
            return res.status(HttpStatus.OK).json()
        } catch (err) {
            console.log(err)
            return res.status(HttpStatus.BAD_REQUEST).json()
        }
    }


    @Public()
    @UseInterceptors(FileInterceptor(''))
    @Post('change-password')
    @ApiOperation({ summary: 'Permite el cambio de contraseña de un usuario' })
    async updatePassword(@Body() model: ChangePasswordValidation, @Headers('Authorization') auth: string, @Res() res: Response): Promise<any> {
        const response = await this.userService.validatePassword(model, auth)
        if (!response)
            return res.status(HttpStatus.BAD_REQUEST).json({});
        const user = await this.userService.updatePassword(model, auth);
        return res.status(HttpStatus.OK).json({ ...user })
    }
}

