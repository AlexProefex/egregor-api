
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber,   } from 'class-validator';
import { MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class LicenseValidation {

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La duracion')})
    @IsNumber({},{message:"La duracion debe ser numerica"})
    duration:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La cantidad')})
    @IsNumber({},{message:"La cantidad debe ser numerica"})
    count:number;

    type:string;
    name:string;
    status:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La empresa')})
    @IsNumber({},{message:"El id de la empresa debe ser numerico"})
    company:number;
    
}

export class LicenseValidationAssing {
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El id')})
    @IsNumber({},{message:"El id de la empresa debe ser numerico"})
    id:number;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La duracion')})
    @IsNumber({},{message:"La duracion debe ser numerica"})
    duration:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El estudiante')})
    @IsNumber({},{message:"La codigo del estudiante es un numero"})
    student:number;

}

export class LicenseValidationStudent {
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El estudiante')})
    @IsNumber({},{message:"La codigo del estudiante es un numero"})
    student:number;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La duracion')})
    @IsDateString({},{message:"La fecha es invalida"})
    time_start:Date;

    type:string;
}


export class LicenseValidationStudentReactive {

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La duracion')})
    @IsDateString({},{message:"La fecha es invalida"})
    time_start:Date;

}

