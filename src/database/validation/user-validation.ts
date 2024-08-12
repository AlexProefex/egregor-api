import { IsNotEmpty, IsEmail, IsBoolean, IsEmpty, isString, IsString, IsOptional, IsNumber, ValidateNested, IsObject, IsEnum } from 'class-validator';
//import { IsUnique } from 'src/validation/is-unique';
///import { IsNumber } from 'src/validation/is-number';
import { MessaeSendResponseIsNotEmpty, MessaeSendResponseIsNumber } from 'src/validation/validation.exception';
import { ApiProperty, ApiResponse,  } from '@nestjs/swagger/dist';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsUnique } from 'src/validation/is-unique';
import { Role } from 'src/util/rol.enum';
import { BankValidationCreate } from './bank-validation';
import { Type } from 'class-transformer';
import { DirectionValidationCreate } from './direction-validation';
import { StatesGroup, TypeStudents } from 'src/util/constants';

export class UserValidation {
 
    @ApiProperty()
    @IsOptional()
    id:number;

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

    @ApiProperty()
    @IsOptional()
    id:number;

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
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La tarifa')})
    tariff:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El carnet de identificacion')})
    carnet_id:string;  

    @ApiProperty()
    @ValidateNested({each:true})
    @IsObject()
    @Type(()=>BankValidationCreate)
    bank:BankValidationCreate;
    
    @ApiProperty()
    @ValidateNested({each:true})
    @IsObject()
    @Type(()=>DirectionValidationCreate)
    direction:DirectionValidationCreate;




}

export class TeacherValidationUpdate {

    @ApiProperty()
    @IsOptional()
    id:number;

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
    @IsOptional()
    password:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El tipo de contrato')})
    type_contract:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La tarifa')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La tarifa')})
    tariff:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El carnet de identificacion')})
    carnet_id:string;  

    @ApiProperty()
    @ValidateNested({each:true})
    @IsObject()
    @Type(()=>BankValidationCreate)
    bank:BankValidationCreate;
    
    @ApiProperty()
    @ValidateNested({each:true})
    @IsObject()
    @Type(()=>DirectionValidationCreate)
    direction:DirectionValidationCreate;




}



export class CompanyValidation {
   
    @ApiProperty()
    @IsOptional()
    id:number;

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

export class CompanyValidationUpdate {
   
    @ApiProperty()
    @IsOptional()
    id:number;

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
    @IsOptional()
    password:string;


}

export class StudentValidation {
   
    @ApiProperty()
    @IsOptional()
    id:number;

    rol:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El apellido')})
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
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El tipo de estudiante')})
    @IsEnum(TypeStudents,{each:true,message:"Solo se aceptan los siguientes valores b2b b2c b2b2c"})
    type_student:string;

    @ApiProperty()
    @IsOptional()
    company:number;

    @ApiProperty()
    @IsOptional()
    country:string;

    @ApiProperty()
    @IsOptional()
    curp:string;
}


export class StudentValidationUpdate {
   
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El usuario')})
    id:number;

    rol:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El apellido')})
    lastName:string;
    

    @ApiProperty()
    @IsUnique({tableName:'user',column:'email'})
    @IsEmail({},{message:"El correo debe tener formato email@email.com"})
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El correo')})
    email:string;

    
    @ApiProperty()
    @IsOptional()
    password:string;


    @ApiProperty()
    @IsOptional()
    company:number;

    @ApiProperty()
    @IsOptional()
    country:string;

    @ApiProperty()
    @IsOptional()
    curp:string;
}



export class ChangePasswordValidation {
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La contraseña actual')})
    currentPassword:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La nueva contraseña')})
    newPassword:string;

}


