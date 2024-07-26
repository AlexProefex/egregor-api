
import { IsBoolean, IsEmpty, IsNotEmpty, isEmpty  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ElementValidation {
    id:number;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El tipo')})
    type:string;

    @ApiProperty()
    title:string;
    
    @ApiProperty()
    content:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    content_pdf:string;

    @ApiProperty()
    type_icon:string;

    @ApiProperty()
    
    embed:string;

    @ApiProperty()
    imagen:string;
    
    @ApiProperty()
    section:number;
}







