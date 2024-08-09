
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, isEmpty  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ElementMaterialValidation {
    id:number;
    
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La descripcion')})
    description:string;


    @ApiProperty()
    url:string;



    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El documento')})
    document:string;

}



export class ElementMaterialUpdateValidation {

    id:number;
    
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La descripcion')})
    description:string;

    @ApiProperty()
    url:string;


    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El documento')})
    document:string;

}






