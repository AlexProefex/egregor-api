
import { IsBoolean, IsNotEmpty, IsNumber  } from 'class-validator';
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
    @IsNumber({},{  message: "El tiempo debe ser un numero"})
    time:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La unit')})
    @IsNumber({},{  message: "La unidad debe ser un numero"})
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
    @IsNumber({},{  message: "El tiempo debe ser un numero"})
    time:number;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('La unit')})
    @IsNumber({},{  message: "La unidad debe ser un numero"})
    unit:number;
}


