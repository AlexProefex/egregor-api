import { HttpException, HttpStatus } from "@nestjs/common";

export const ExceptionErrorMessage = (err) => {
    throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Ha ocurrido un error al procesar su solicitud, vuelva intentarlo o contacte con su administrador',
    }, HttpStatus.BAD_REQUEST, {
        cause: err
    });
}
