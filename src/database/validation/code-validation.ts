
import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessaeSendResponseIsNotEmpty } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CodeValidationSend {

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El titulo') })
    @IsEmail({}, { message: "El correo debe tener formato email@email.com" })
    email: string;

}



export class CodeValidationVerify {
    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El titulo') })
    @IsEmail({}, { message: "El correo debe tener formato email@email.com" })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El codigo de seguridad') })
    securityCode: string;
}



export class CodeValidationChangePassword {
    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('El titulo') })
    @IsEmail({}, { message: "El correo debe tener formato email@email.com" })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: MessaeSendResponseIsNotEmpty('La contraseña') })
    password: string;
}






