import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user-entity/user-entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//import { ExceptionErrorMessage } from 'src/validation/exception-error';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity)
        private readonly userRp:Repository<UserEntity>,
        private jwtService: JwtService
      ) {}

    //Guardar Usuario
    async saveUser(user:any){
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            user = await this.userRp.save(user);
            const { password, ...result } = user;
            return result;
        } catch (error) {
            return error
          //  ExceptionErrorMessage(error);            
        }
    }


    //Consultar un usuario por su email
    async searchUser(email:any,pass:any){
        const user  = await this.userRp.findOne({where:{email:email}});
        if (!user) {
            return null;
        }
        const passwordIsValid = await user.validatePassword(pass);
        if(!passwordIsValid){
            return null;
        }
        const { password, ...result } = user;
        return result;
    }

    //Conceder permiso de acceso y generaccion de token
    async loginPassport(user:any){
        const payload = { 
            id: user.id,
            name:user.name,
            last_name:user.last_name,
            email:user.email, 
            rol:user.rol};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
