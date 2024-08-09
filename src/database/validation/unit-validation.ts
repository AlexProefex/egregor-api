
import { IsBoolean, IsNotEmpty, IsNumber  } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty, MessaeSendResponseIsNumber } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UnitValidation {
    id:number;
    
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nombre')})
    name:string;

    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El nivel')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('El nivel')})
    level:number;

}





