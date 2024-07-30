import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserValidation } from 'src/database/validation/user-validation';
import { token } from './token.service';
import { error } from 'console';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { removeNUllObject } from 'src/util/custom';
//import { ExceptionErrorMessage } from 'src/validation/exception-error';
export type User = any;

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRp: Repository<UserEntity>,
        private readonly jwtUtil: token
    ) {
    }

    async newCamps(auth: any){
        const current = await this.jwtUtil.decode(auth);
        const response = await this.userRp.findOne({
            select: {
                name: true, lastName: true, email: true, rol: true,  phone: true, id:true, avatar:true, status_login:true, company_name:true, description:true
            }, where: {id: current.id }
        });
        return response
    }
    //Listar Usuarios
    async findUser(auth: any){
        const current = await this.jwtUtil.decode(auth);
        const response = await this.userRp.findOne({
            select: {
                name: true, email: true, rol: true, lastName: true, phone: true, description: true, avatar: true
            }, where: { id: current.id }
        });
        return response
    }

    async findUserById(id:number){
        const response = await this.userRp.findOne({where: { id: id }});
        const {password, ...res } = response;
        return res
    }

   

    async saveUserGeneral(user:any){
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            user = await this.userRp.save(user);
            const { password, ...result } = user;
            return removeNUllObject(result);
        } catch (error) {
            console.log(error)
            ExceptionErrorMessage(error);            
        }
    }

    async updateUserGeneral(user: any, id) {
        try {
            await this.userRp.update(id, user);
            const response = await this.userRp.findOne({ where: { id: id }});
            const { password, ...result } = response;
            return removeNUllObject(result);
        } catch (error) {
            ExceptionErrorMessage(error);
        }
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
    async updateUser(user: any, name, auth: any) {
        try {
            const current = await this.jwtUtil.decode(auth);
            if(name){
                user.avatar = name;
            }
            await this.userRp.update(current.id, user);
            const response = await this.userRp.findOne({
                select: {
                    name: true, email: true, rol: true, lastName: true, phone: true, description: true, avatar: true,
                }, where: { id: current.id }
            });
            return response;
        } catch (error) {
            console.log(error)
            ExceptionErrorMessage(error);
        }
    }

    async updatePassword(user: any, auth: any) {
        try {
            const salt = await bcrypt.genSalt();
            console.log(salt)
            const hashedPassword = await bcrypt.hash(user.newPassword, salt);
            console.log(hashedPassword)

            const current = await this.jwtUtil.decode(auth);
            await this.userRp.update(current.id, {password:hashedPassword});
            const response = await this.userRp.findOne({
                select: {
                    name: true, email: true, rol: true, lastName: true, phone: true, description: true, avatar: true,
                }, where: { id: current.id }
            });
            return response;
        } catch (error) {
            console.log(error)
            ExceptionErrorMessage(error);
        }
    }

    async validatePassword(user: any, auth: any){
        try{

            const current = await this.jwtUtil.decode(auth);
            const currentUser = await this.userRp.findOneBy({id:current.id})

            return await bcrypt.compare(user.currentPassword,currentUser.password )
    
        } catch (error) {
            console.log(error)
            ExceptionErrorMessage(error);
        }
    }





    /*
    //Listar Usuarios
    async findAllUsers(){
        try {
            return await this.userRp.find({select:['id','lastName','avatar','description','email','rol','socialNetwork','sort','status'],order:{sort:'ASC'}});
        } catch (error) {
          //  ExceptionErrorMessage(error); 
        }
    }
*/
    //Listar Usuarios
    /* async findAllUsersActive(){
         try {
             return await this.userRp.find({select:['id','lastName','avatar','description','email','rol','socialNetwork','sort','status'],order:{sort:'ASC'},where:{status:true}});
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
