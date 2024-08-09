
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, isEmpty  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ElementVideoAudioValidation {
    id:number;
    
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El tipo de archivo')})
    type_icon:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El embed')})
    embed:string;

  
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section:number;

}



export class ElementVideoAudioUpdateValidation {

    id:number;
    
    type:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El tipo de archivo')})
    type_icon:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El embed')})
    embed:string;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section:number;

}






