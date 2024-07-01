import { IsNotEmpty, IsEmail } from 'class-validator';
//import { IsUnique } from 'src/validation/is-unique';
import { MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class LoginValidation {
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El correo')})
    @IsEmail({},{message:"El correo debe tener formato email@email.com"})
    email:string;
    @ApiProperty()
    @IsNotEmpty({  message: MessaeSendResponseIsNotEmpty('El password')})
    password:string;

}