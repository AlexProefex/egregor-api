
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, isEmpty } from 'class-validator';
import { MessaeSendResponseIsBoolean, MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class ElementPracticeValidation {

    type: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El titulo') })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La duracion') })
    @IsNumber({}, { message: "El tiempo debe ser un numero" })
    time: number;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El Nivel') })
    @IsNumber({}, { message: "El nivel debe ser un numero" })
    levelId: number;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La seccion') })
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section: number;

}


export class ElementPracticeUpdateValidation {
    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El id') })
    id: number;

    type: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El titulo') })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La duracion') })
    @IsNumber({}, { message: "El tiempo debe ser un numero" })
    time: number;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El Nivel') })
    @IsNumber({}, { message: "El nivel debe ser un numero" })
    levelId: number;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La seccion') })
    @IsNumber({}, { message: "La seccion debe ser un numero" })
    section: number;

}






