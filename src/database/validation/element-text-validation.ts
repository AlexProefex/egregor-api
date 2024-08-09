
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, isEmpty  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ElementTextValidation {
    id:number;
    
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El contenido')})
    content:string;

 

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section:number;

}

export class ElementTextUpdateValidation {

    id:number;
    
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El contenido')})
    content:string;



    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section:number;

}






