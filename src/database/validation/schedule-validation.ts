{
    
}
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, isNumber, IsNumber  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty, MessaeSendResponseIsNumber } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';
import { ScheduleEntity } from '../entity/schedule/schedule-entity';

export class ScheduleValidation {
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El dia')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('El dia')})
    day:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El dia')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('El dia')})
    start_time:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El dia')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('El dia')})
    end_time:string;



}




