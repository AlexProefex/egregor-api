import { IsBoolean, IsNotEmpty, IsNumber  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class QSectionValidation {
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El cuestionario')})
    @IsNumber({}, { message: "El custionario debe ser un numero" })
    quiz:number;
}


export class QSectionValidationUpdate {
    id:number;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El custionario')})
    @IsNumber({}, { message: "El custionario debe ser un numero" })
    quiz:string;
}

