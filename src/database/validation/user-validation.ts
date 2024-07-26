import { IsNotEmpty, IsEmail, IsBoolean, IsEmpty, isString, IsString, IsOptional } from 'class-validator';
//import { IsUnique } from 'src/validation/is-unique';
///import { IsNumber } from 'src/validation/is-number';
import { MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty, ApiResponse,  } from '@nestjs/swagger/dist';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsUnique } from 'src/validation/is-unique';
import { Role } from 'src/util/rol.enum';

export class UserValidation {
 
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('Los apellidos')})
    lastName:string;

    @ApiProperty()
    @IsUnique({tableName:'user',column:'email'})
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El correo')})
    @IsEmail({},{message:"El correo debe tener formato email@email.com"})
    email:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El Telefono')})
    phone:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La descripcion')})
    description:string;

    @ApiProperty()
    @IsOptional({  message: MessaeSendResponseIsNotEmpty('La imagen')})
    avatar:string;

    @ApiProperty()
    @IsOptional({  message: MessaeSendResponseIsNotEmpty('La imagen')})
    image:string;   

    lastestImage:string

}


export class TeacherValidation {

    rol:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('Los apellidos')})
    lastName:string;

    @ApiProperty()
    @IsUnique({tableName:'user',column:'email'})
    @IsEmail({},{message:"El correo debe tener formato email@email.com"})
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El correo')})
    email:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El password')})
    password:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El tipo de contrato')})
    type_contract:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La tarifa')})
    tariff:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El link de paypal')})
    paypal_link:string;   

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El carnet de identificacion')})
    carnet_id:string;   
}



export class CompanyValidation {
    
    rol:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    company_name:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El representante')})
    representative:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La marca comercial')})
    comercial_brand:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La razon social')})
    business_name:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El pais')})
    country:string;

    @ApiProperty()
    @IsOptional()
    fiscal_rcf:string;

    @ApiProperty()
    @IsUnique({tableName:'user',column:'email'})
    @IsEmail({},{message:"El correo debe tener formato email@email.com"})
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El correo')})
    email:string;

    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El password')})
    password:string;


}


export class ChangePasswordValidation {
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La contraseña actual')})
    currentPassword:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La nueva contraseña')})
    newPassword:string;

}


