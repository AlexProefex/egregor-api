import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { DataSource, MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserValidation } from 'src/database/validation/user-validation';
import { token } from './token.service';
import { error } from 'console';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { removeNUllObject } from 'src/util/custom';
import { TypeActive, TypeCompany, TypeStudent, TypeTeacher } from 'src/util/constants';
import { DirectionEntity } from 'src/database/entity/direction/direction';
import { BankEntity } from 'src/database/entity/bank/bank';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import { DateTime } from "luxon";
import { GroupEntity } from 'src/database/entity/group/group-entity';

//import { ExceptionErrorMessage } from 'src/validation/exception-error';
//export type User = any;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRp: Repository<UserEntity>,
        @InjectRepository(DirectionEntity) private readonly directionRp: Repository<DirectionEntity>,
        @InjectRepository(BankEntity) private readonly bankRp: Repository<BankEntity>,
        @InjectRepository(LicenseEntity) private readonly lincenseRp: Repository<LicenseEntity>,
        @InjectRepository(GroupEntity) private readonly groupRp: Repository<GroupEntity>,
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
            }, where: { rol: TypeTeacher }, relations: { bank: true, direction: true }, order: { id: "DESC" }
        });
        if (response) {
            return response;
        }
        return response
    }
    
    async findUserTeachersShort() {
         const response = await this.datasource.createQueryBuilder()
        .select('user.id','id')
        .addSelect(`CONCAT("user"."name",' ',"user"."lastName") AS name`)
        .from(UserEntity,'user')
        .where(`"user"."rol" = '${TypeTeacher}'`)
        .getRawMany()
        return response
    }
    async findStudent(id) {
        const response = await this.userRp.findOne({
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                company: true,
                direction: { id: true },
                curp: true
            }, where: { id: id, rol: TypeStudent }, relations: { direction: true }, order: { id: "DESC" }
        });
        if (response) {
            if (response.direction) {
                // @ts-ignore: Unreachable code error
                response.direction = (await this.directionRp.findOne({ select: { country: true }, where: { id: response.direction.id } }))?.country

            }

            if (response.company) {
                console.log(response.company)
                // @ts-ignore: Unreachable code error
                response.company = (await this.userRp.findOne({ select: { company_name: true }, where: { id: response.company } }))?.company_name
            }
        }
        return response
    }

    async findStudents() {
        const response = await this.userRp.find({
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                curp: true,
                type_student: true,
            }, where: { rol: TypeStudent }
        });
        return response
    }


    async findUserCompanys() {
        const response = await this.userRp.find({
            select: {
                id: true,
                company_name: true,
                representative: true,
                email: true,

            }, where: { rol: TypeCompany }, relations: { bank: true, direction: true }, order: { id: "DESC" }
        });
        if (response) {
            return response;
        }
        return response
    }


    async findUserCompanysFiltered() {

        const response = this.datasource.createQueryBuilder()
        .select('id', 'id')
        .addSelect('company_name', 'name')
        .from(UserEntity, 'user')
        .where(`"user"."rol"='${TypeCompany}'`)
        .getRawMany()
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


            const user2 = await queryRunner.manager.withRepository(this.userRp).save(currentUser);
            console.log(user2)

            await queryRunner.commitTransaction()

        } catch (error) {
            console.log(error)
            await queryRunner.rollbackTransaction()
            ExceptionErrorMessage(error);
        } finally {
            await queryRunner.release()
        }



    }

    async updateTeacher(user: any, id) {

        const queryRunner = this.datasource.createQueryRunner()
        await queryRunner.startTransaction()
        try {
            let currentUser = user
            let bank
            let direction
            if (currentUser.password) {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(currentUser.password, salt);
                currentUser.password = hashedPassword;
            }
            const lastUser = await queryRunner.manager.withRepository(this.userRp).findOne({ where: { id: id }, relations: { bank: true, direction: true } })

            await queryRunner.manager.withRepository(this.userRp).update({ id: id }, { direction: null, bank: null })


            if (lastUser.bank?.id) {
                await queryRunner.manager.withRepository(this.bankRp).delete({ id: lastUser.bank.id })
            }

            if (lastUser.direction?.id) {
                await queryRunner.manager.withRepository(this.directionRp).delete({ id: lastUser.direction.id })
            }
            //currentUser.password = hashedPassword;

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

    async updateUserGeneral(user: any, id) {

        try {
            if (user.password) {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword;
            }
            await this.userRp.update(id, user);
            const response = await this.userRp.findOne({ where: { id: id } });

            const { password, ...result } = response;
            return removeNUllObject(result);
        } catch (error) {
            ExceptionErrorMessage(error);
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


    async deleteStudent(id:any){
        const queryRunner = this.datasource.createQueryRunner()
        await queryRunner.startTransaction()
        let message = null
        try {
            
            const student = await  queryRunner.manager.withRepository(this.userRp).findOne({where:{id:id}});
            const license = await  queryRunner.manager.withRepository(this.lincenseRp).findOne({where:{student:{id:id}}});
            if(license) {
                const endTime = license.time_left.toISOString().split("T")[0]+'T00:00:00';
                const end_time = DateTime.fromISO(endTime);
                const current = DateTime.now(new Date().toISOString().split("T")[0]+'T00:00:00')
                const current_time = DateTime.fromISO(current);
                if(end_time>current_time){
                    message =  "No se puede borrar un estudiante con licencia activa"
                    new Error("")
                }
                else {
                    await queryRunner.manager.withRepository(this.lincenseRp).delete({student:{id:id}});
                }
                if(student.id_group !=0){
                    message =  "No se puede borrar un estudiante afiliado a un grupo"
                    new Error()
                }
            }
            await  queryRunner.manager.withRepository(this.userRp).delete({id:id})
            await queryRunner.commitTransaction()
        }
        catch(error){
            await queryRunner.rollbackTransaction()
            ExceptionErrorMessage(message||error);
        } finally {
            await queryRunner.release()
            return message
        }
    }


    async deleteTeacher(id:any){
        const queryRunner = this.datasource.createQueryRunner()
        await queryRunner.startTransaction()
        let message = null
        try {
            
            const group = await  queryRunner.manager.withRepository(this.groupRp).find({where:{teacher:{id:id}}});

            if(group.length > 0){
                message =  "No se puede borrar un profesor con grupos activos"
                new Error("")
            }
            
            await  queryRunner.manager.withRepository(this.userRp).delete({id:id})
            await queryRunner.commitTransaction()
        }
        catch(error){
            await queryRunner.rollbackTransaction()
            ExceptionErrorMessage(message||error);
        } finally {
            await queryRunner.release()
            return message
        }
    }


    async deleteCompany(id:any){
        const queryRunner = this.datasource.createQueryRunner()
        await queryRunner.startTransaction()
        let message = null
        try {
            
            const license = await  queryRunner.manager.withRepository(this.lincenseRp).find({where:{company:{id:id}, time_left:MoreThan(new Date())}});
            if(license.length > 0){
                message =  "No se puede borrar empresas con licencia activa"
                new Error("")
            }

            await  queryRunner.manager.withRepository(this.userRp).delete({id:id})
            await queryRunner.manager.withRepository(this.userRp).delete({company:id})
            await queryRunner.manager.withRepository(this.groupRp).delete({company:id})

            await queryRunner.commitTransaction()
        }
        catch(error){
            await queryRunner.rollbackTransaction()
            ExceptionErrorMessage(message||error);
        } finally {
            await queryRunner.release()
            return message
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
