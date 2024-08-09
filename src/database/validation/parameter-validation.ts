import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { MessaeSendResponseIsNotEmpty } from "src/validation/validation.exception";

export class ParameterValidation {
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El id')})
    id:number;
   
}
