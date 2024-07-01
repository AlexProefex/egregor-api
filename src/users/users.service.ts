import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user-entity/user-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserValidation } from 'src/database/validation/user-validation';
import { token } from './token.service';
import { error } from 'console';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
//import { ExceptionErrorMessage } from 'src/validation/exception-error';
export type User = any;

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRp:Repository<UserEntity>,
    private readonly jwtUtil: token
){
    }
    //Guardar Usuario
   /* async saveUser(user:UserValidation){

        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            return await this.userRp.save(user);
            //return user;
        } catch (error) {
           // ExceptionErrorMessage(error); 
        }
    }*/
    //Actualizar Usuario
    async updateUser(user:UserValidation, path, auth:any){
        try {
            const current = await this.jwtUtil.decode(auth);
            console.log(current)
            console.log(user)
            console.log(path)
            user.avatar = path;

            //const salt = await bcrypt.genSalt();
            //const hashedPassword = await bcrypt.hash(user.password, salt);
            //user.password = hashedPassword;
            await this.userRp.update(current.id,user);
            //user = await this.userRp.findOneBy({id:current.id});
            //const { password, ...result } = user
            //return result;

        } catch (error) {
            console.log(error)
         
            ExceptionErrorMessage(error); 
        }
    }
    /*
    //Listar Usuarios
    async findAllUsers(){
        try {
            return await this.userRp.find({select:['id','fullName','avatar','description','email','rol','socialNetwork','sort','status'],order:{sort:'ASC'}});
        } catch (error) {
          //  ExceptionErrorMessage(error); 
        }
    }
*/
    //Listar Usuarios
   /* async findAllUsersActive(){
        try {
            return await this.userRp.find({select:['id','fullName','avatar','description','email','rol','socialNetwork','sort','status'],order:{sort:'ASC'},where:{status:true}});
        } catch (error) {
           // ExceptionErrorMessage(error); 
        }
    }
*/
    //Listar 
    /*async findOne(email:string){
        try {
            return await this.userRp.findOne({where:{email:email}});
        } catch (error) {
            //ExceptionErrorMessage(error); 
        }
    }*/

    //Borrar Usuario
   /* async deleteUser(id:any){
        try {
            await this.userRp.createQueryBuilder()
                .update(UserEntity)
                .set({ status: false})
                .where("id = :id", { id: id})
                .execute();
            return {message:"Se ha modificado el registro seleccionado"};
        }
        catch(error){
            //ExceptionErrorMessage(error); 
        }
    }*/
}
