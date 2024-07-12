import { IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
//import { IsUnique } from 'src/validation/is-unique';
///import { IsNumber } from 'src/validation/is-number';
import { MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UserValidation {

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('Los apellidos')})
    lastName:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El correo')})
    email:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El Telefono')})
    phone:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La imagen')})
    avatar:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La imagen')})
    image:string;   

    lastestImage:string

}


export class ChangePasswordValidation {

    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La contraseña actual')})
    currentPassword:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La nueva contraseña')})
    newPassword:string;

}