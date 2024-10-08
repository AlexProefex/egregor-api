{
    
}
import { IsArray, IsDateString, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, ValidateNested  } from 'class-validator';
import { MessaeSendResponseIsNotEmpty, MessaeSendResponseIsNumber } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';
import { ScheduleValidation } from './schedule-validation';
import { Type } from 'class-transformer';
import { ArrayContains } from 'typeorm';
import { StatesGroup, TypesGroup } from 'src/util/constants';

export class  OpenGroupValidation {
    



    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El grupo')})
    group_number:string;


    type:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El estado')})
    @IsEnum(StatesGroup,{each:true})
    status:string;

    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nivel')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('El nivel')})
    level:number;


    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El proefesor')})
    @IsNumber({},{message:MessaeSendResponseIsNumber('El profesor')})
    teacher:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La duracion')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('La duracion')})
    duration:number;
    
    @ApiProperty({isArray:true, type:ScheduleValidation})
    @ValidateNested({each:true})
    @IsArray()
    @Type(()=>ScheduleValidation)
    schedule:ScheduleValidation[];

}


export class CloseGroupValidation {
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La compañia')})
    @IsNumber({},{message:"El codigo de la compañia es un numero"})
    company:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La fecha de inicio')})
    @IsDateString({},{message:"La fecha de inicio es invalida"})
    start_time:Date;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La fecha de fin')})
    @IsDateString({},{message:"La fecha de fin es invalida"})
    end_time:Date;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El grupo')})
    group_number:string;


    type:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El estado')})
    @IsEnum(StatesGroup,{each:true})
    status:string;

    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nivel')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('El nivel')})
    level:number;


    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El proefesor')})
    @IsNumber({},{message:MessaeSendResponseIsNumber('El profesor')})
    teacher:number;

    @ApiProperty({isArray:true, type:ScheduleValidation})
    @ValidateNested({each:true})
    @IsArray()
    @Type(()=>ScheduleValidation)
    schedule:ScheduleValidation[];
    
}

export class GroupValidationAddStudent {

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El grupo')})
    group_number:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El estudiante')})
    student:number;

    @ApiProperty()
    @IsOptional()
    @IsDateString({},{message:"La fecha de inicio es invalida"})
    time_start:Date;

    @ApiProperty()
    @IsOptional()
    @IsDateString({},{message:"La fecha de finalizacion es invalida"})
    time_end:Date;

}


export class GroupValidationChangeStudent {

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El grupo')})
    group_number:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El estudiante')})
    student:number;
}



