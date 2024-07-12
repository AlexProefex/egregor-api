
import { IsBoolean, IsNotEmpty  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ExamValidation {
    @ApiProperty()
    id:number;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    type:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El tiempo')})
    time:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La unit')})
    unit:number;
}



export class updateExamValidation {
    @ApiProperty()
    id:number;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    type:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El tiempo')})
    time:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La unit')})
    unit:number;
}


