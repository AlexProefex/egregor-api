{
    
}
import { IsNotEmpty, IsNumber  } from 'class-validator';
import {  MessaeSendResponseIsNotEmpty, MessaeSendResponseIsNumber } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ScheduleValidation {
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El dia')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('El dia')})
    day:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La hora de inicio')})
    start_time:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La hora de fin')})
    end_time:string;



}




