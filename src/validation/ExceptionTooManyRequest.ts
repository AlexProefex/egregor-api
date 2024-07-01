
import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ExceptionTooManyRequest implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse();
        response.status(exception.getStatus()).send({
            message: "Ha realizado demasiadas peticiones espere un momento y vuelva a intentarlo"
        });
        
    }
}