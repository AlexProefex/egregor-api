import { HttpException, HttpStatus } from "@nestjs/common";

export const ExceptionErrorMessage = (err) => {
    throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Ha ocurrido un error al procesar su solicitud, vuelva intentarlo o contacte con su administrador',
    }, HttpStatus.BAD_REQUEST, {
        cause: err
    });
}

export const NotFoundErrorMessage = (err) => {
    throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Registro no encontrado',
    }, HttpStatus.NOT_FOUND, {
        cause: err
    });
}


export const ExceptionErrorAmountinsufficient = (err) => {
    throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: err.message,
    }, HttpStatus.BAD_REQUEST, {
        cause: err.message
    });
}
