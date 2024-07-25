{
    
}
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, isNumber, IsNumber  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';
import { ScheduleValidation } from './schedule-validation';

export class ExamValidation {
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La compañia')})
    @IsNumber({},{message:"El codigo de la compañia es un numero"})
    company:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La fecha')})
    @IsDateString({},{message:"La fecha es invalida"})
    start_time:Date;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La fecha')})
    @IsDateString({},{message:"La fecha es invalida"})
    end_time:Date;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El codigo')})
    @IsNumber({},{message:"El codigo de un grupo  es un numero"})
    group_number:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El tipo de grupo')})
    type:string;


    status:string;
    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La compañia')})
    @IsNumber({},{message:"El codigo de la compañia es un numero"})
    level:number;


    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La compañia')})
    @IsNumber({},{message:"El codigo de la compañia es un numero"})
    teacher:number;

    @IsArray()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La compañia')})
    schedule:ScheduleValidation[];


}




