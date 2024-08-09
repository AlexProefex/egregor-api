import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserValidation } from 'src/database/validation/user-validation';
import { token } from './token.service';
import { error } from 'console';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { removeNUllObject } from 'src/util/custom';
import { TypeCompany, TypeTeacher } from 'src/util/constants';
import { DirectionEntity } from 'src/database/entity/direction/direction';
import { BankEntity } from 'src/database/entity/bank/bank';
import { last } from 'rxjs';
//import { ExceptionErrorMessage } from 'src/validation/exception-error';
export type User = any;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRp: Repository<UserEntity>,
        @InjectRepository(DirectionEntity) private readonly directionRp: Repository<DirectionEntity>,
        @InjectRepository(BankEntity) private readonly bankRp: Repository<BankEntity>,
        private datasource: DataSource,
        private readonly jwtUtil: token
    ) {
    }

    async findUserTeachers() {
        const response = await this.userRp.find({
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                type_contract: true,
            }, where: { rol: TypeTeacher }, relations: { bank: true, direction: true }
        });
        if (response) {
            return response;
        }
        return response
    }


    async findUserCompanys() {
        const response = await this.userRp.find({
            select: {
                id: true,
                company_name: true,
                representative: true,
                email: true,

            }, where: { rol: TypeCompany }, relations: { bank: true, direction: true }
        });
        if (response) {
            return response;
        }
        return response
    }



    async newCamps(auth: any) {
        const current = await this.jwtUtil.decode(auth);
        const response = await this.userRp.findOne({
            select: {
                name: true, lastName: true, email: true, rol: true, phone: true, id: true, avatar: true, status_login: true, company_name: true, description: true
            }, where: { id: current.id }
        });
        return response
    }
    //Listar Usuarios
    async findUser(auth: any) {
        const current = await this.jwtUtil.decode(auth);
        const response = await this.userRp.findOne({
            select: {
                name: true, email: true, rol: true, lastName: true, phone: true, description: true, avatar: true
            }, where: { id: current.id }
        });

        return response
    }

    async findUserById(id: number) {
        const response = await this.userRp.findOne({ where: { id: id }, relations: { direction: true, bank: true } });
        if (response) {
            const { password, ...res } = response;
            return res
        }
        return response
    }



    async saveUserGeneral(user: any) {
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

    async saveUserTeacher(user: any) {
        const queryRunner = this.datasource.createQueryRunner()
        await queryRunner.startTransaction()
        try {
            let currentUser = user
            let bank
            let direction
            // const { street, ext_number, int_number, neighborhood, country, state, postal_code, bank_name, swift_code, bank_account, bank_address, ...currentUser } = user
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(currentUser.password, salt);
            currentUser.password = hashedPassword;

            if (Object.keys(currentUser.bank).length == 0) {
                delete currentUser.bank
            } else {
                bank = await queryRunner.manager.withRepository(this.bankRp).save(currentUser.bank)
                currentUser.bank = bank.id
            }

            if (Object.keys(currentUser.direction).length == 0) {
                delete currentUser.direction
            } else {
                direction = await queryRunner.manager.withRepository(this.directionRp).save(currentUser.direction)
                currentUser.direction = direction.id

            }


            await queryRunner.manager.withRepository(this.userRp).save(currentUser);

            await queryRunner.commitTransaction()

        } catch (error) {
            console.log(error)
            await queryRunner.rollbackTransaction()
            ExceptionErrorMessage(error);
        } finally {
            await queryRunner.release()
        }



    }

    async updateUserGeneral(user: any, id) {

        const queryRunner = this.datasource.createQueryRunner()
        await queryRunner.startTransaction()
        try {
            let currentUser = user
            let bank
            let direction
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(currentUser.password, salt);
            const lastUser = await queryRunner.manager.withRepository(this.userRp).findOne({ where: { id: id }, relations: { bank: true, direction: true } })

            await queryRunner.manager.withRepository(this.userRp).update({id:id},{direction:null,bank:null })


            if (lastUser.bank?.id) {
                await queryRunner.manager.withRepository(this.bankRp).delete({ id: lastUser.bank.id })
            }

            if (lastUser.direction?.id) {
                await queryRunner.manager.withRepository(this.directionRp).delete({ id: lastUser.direction.id })
            }
            currentUser.password = hashedPassword;

            if (Object.keys(currentUser.bank).length == 0) {
                delete currentUser.bank
            } else {
                bank = await queryRunner.manager.withRepository(this.bankRp).save(currentUser.bank)
                currentUser.bank = bank.id
            }

            if (Object.keys(currentUser.direction).length == 0) {
                delete currentUser.direction
            } else {
                direction = await queryRunner.manager.withRepository(this.directionRp).save(currentUser.direction)
                currentUser.direction = direction.id
            }

            await queryRunner.manager.withRepository(this.userRp).update(id, currentUser);

            await queryRunner.commitTransaction()

        } catch (error) {
            console.log(error)
            await queryRunner.rollbackTransaction()
            ExceptionErrorMessage(error);
        } finally {
            await queryRunner.release()
        }

    }


    async updateUser(user: any, name, auth: any) {
        try {
            const current = await this.jwtUtil.decode(auth);
            if (name) {
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
            await this.userRp.update(current.id, { password: hashedPassword });
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

    async validatePassword(user: any, auth: any) {
        try {

            const current = await this.jwtUtil.decode(auth);
            const currentUser = await this.userRp.findOneBy({ id: current.id })

            return await bcrypt.compare(user.currentPassword, currentUser.password)

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
