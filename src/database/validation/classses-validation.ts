import { IsNotEmpty, IsNumber } from 'class-validator';
import { MessaeSendResponseIsNotEmpty, MessaeSendResponseIsNumber } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CodeValidationSend {


    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La fecha') })
    date: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La hora de Inicio') })
    start_time: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La hora de finalizacion') })
    end_time: string;


    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El grupo') })
    @IsNumber({},{ message: MessaeSendResponseIsNumber('El grupo') })
    group: number;
 
}
