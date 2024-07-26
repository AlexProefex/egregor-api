
import { IsBoolean, IsEmpty, IsNotEmpty, isEmpty  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ElementImageValidation {
    id:number;
    
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La imagen')})
    image:string;

    @ApiProperty()
    url:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    levelId:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    section:number;

}

export class ElementImageUpdateValidation {

    id:number;
    
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La imagen')})
    image:string;


    @ApiProperty()
    url:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    levelId:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    section:number;

}






