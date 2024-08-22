import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { StatusActiveLicense, StatusStopLicense, TypeActive, TypeB2B, TypeB2B2C, TypeB2C, TypeCompany, TypeInactive, TypeStudent } from 'src/util/constants';
import { ExceptionErrorAmountinsufficient, ExceptionErrorMessage } from 'src/validation/exception-error';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LicenseService {
  constructor(@InjectRepository(LicenseEntity)
  private readonly licenseRp: Repository<LicenseEntity>,
    @InjectRepository(UserEntity) private readonly userRp: Repository<UserEntity>,

    private datasource: DataSource) {
  }
  async saveLicenseCompany(model: any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const company = await queryRunner.manager.withRepository(this.userRp).findOneBy({ id: model.company })
      for (let i = 1; i <= model.count; i++) {
        const name = `${company.company_name} - Licencia ${i}`
        await queryRunner.manager.withRepository(this.licenseRp).save({ company: model.company, name: name, duration_full: model.duration, duration_rest: model.duration, type: model.type })
      }
      await queryRunner.commitTransaction()

    } catch (err) {
      console.log(err)
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err);
    } finally {
      await queryRunner.release()
    }
  }

  async updateLicenseStudent(id:any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const license = await queryRunner.manager.createQueryBuilder().select('license.id','id').addSelect('license.studentId','studentId').from(LicenseEntity,"license").where(`"license"."id"=${id}`).getRawOne()
    
      await queryRunner.manager.withRepository(this.userRp).update({id:license.studentId},{ status_license: TypeInactive, status_login:TypeInactive })
      await queryRunner.manager.withRepository(this.licenseRp).update({id:id},{  status:StatusStopLicense })
      await queryRunner.commitTransaction()

    } catch (err) {
      console.log(err)
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err);
    } finally {
      await queryRunner.release()
    }
  }

  async reactiveLicenseStudent(id:any, model:any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const license = await queryRunner.manager.createQueryBuilder().select('license.id','id').addSelect('license.studentId','studentId').from(LicenseEntity,"license").where(`"license"."id"=${id}`).getRawOne()
    
      await queryRunner.manager.withRepository(this.userRp).update({id:license.studentId},{ status_license: TypeActive })
      await queryRunner.manager.withRepository(this.licenseRp).update({id:id},{  time_start: model.time_start,status:StatusActiveLicense })
      await queryRunner.commitTransaction()

    } catch (err) {
      console.log(err)
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err);
    } finally {
      await queryRunner.release()
    }
  }


  async saveLicenseStudent(model: any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      //const date = new Date(model.time_start)
      //let endTime = new Date(date.setMonth(date.getMonth()+1))
      await queryRunner.manager.withRepository(this.userRp).update({id:model.student},{ status_license: TypeActive })
      await queryRunner.manager.withRepository(this.licenseRp).save({ type: model.type, student:model.student, time_start:model.time_start, status:StatusActiveLicense })
      await queryRunner.commitTransaction()

    } catch (err) {
      console.log(err)
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err);
    } finally {
      await queryRunner.release()
    }
  }



  async getListStundetByCompany(id: any) {
    //return await this.userRp.find({ select: { id: true, name: true, lastName: true }, where: { company: id, rol: TypeStudent, status_license: TypeInactive } })
    return await this.datasource
    .createQueryBuilder()
    .select('user.id','id')
    .addSelect(`CONCAT("user"."name",' ',"user"."lastName") AS name`)
    .from(UserEntity, 'user')
    .leftJoin(LicenseEntity, 'license', 'license.companyId = user.id')
    .where(`"user"."rol" = '${TypeStudent}'`)
    .andWhere(`"user"."status_license" = '${TypeInactive}'`)
    .andWhere(`"user"."id" NOT IN (SELECT "license"."studentId" FROM "license" WHERE "license"."studentId" IS NOT NULL)`)
    .andWhere(`"user"."type_student" = '${TypeB2B}'`)
    .andWhere(`"user"."company" = '${id}'`)
    .getRawMany()
 
  }

  async getListStundets() {
    return await this.datasource
      .createQueryBuilder()
      .select('user.id','id')
      .addSelect(`CONCAT("user"."name",' ',"user"."lastName") AS name`)
      .addSelect('license.status','status')
      .addSelect('license.time_start','time_start')
      .from(UserEntity, 'user')
      .leftJoin(LicenseEntity, 'license', 'license.studentId = user.id')
      .where(`"user"."rol" = '${TypeStudent}'`)
     // .andWhere(`"user"."status_license" = '${TypeInactive}'`)
      //.andWhere(`"user"."id" NOT IN (SELECT "license"."studentId" FROM "license" WHERE "license"."studentId" IS NOT NULL)`)
      .andWhere(`"user"."type_student" = '${TypeB2C}' OR "user"."type_student" = '${TypeB2B2C}' `)
      .getRawMany()
  }

  async assingLicenseToStudent(model: any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const license = await queryRunner.manager.withRepository(this.licenseRp).findOneBy({id:model.id})
      const duration_rest = license.duration_full - model.duration
      if(duration_rest>=0){
        await queryRunner.manager.withRepository(this.licenseRp).update({id:model.id},{student:model.student, duration_use:model.duration, duration_rest:duration_rest})
        await queryRunner.manager.withRepository(this.userRp).update({id:model.student},{status_license:TypeActive})
      }else{
        return new Error("Failed")
      }
      await queryRunner.commitTransaction()
   
    } catch (err) {
      console.log(err)
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err);
    } finally {
      await queryRunner.release()
    }
  }

  async re_assingLicenseToStudent(model: any) {
    let error = false;
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const license = await queryRunner.manager.createQueryBuilder().select('license.id','id').addSelect('license.duration_rest','duration_rest').addSelect('license.studentId','studentId').from(LicenseEntity,"license").where(`"license"."id"=${model.id}`).getRawOne()
      const duration_rest = license.duration_rest - model.duration
      if(duration_rest>0){
        await queryRunner.manager.withRepository(this.userRp).update({id:license.studentId},{status_license:TypeInactive, status_login:TypeInactive})
        await queryRunner.manager.withRepository(this.licenseRp).update({id:model.id},{student:model.student, duration_use:model.duration, duration_rest:duration_rest})
        await queryRunner.manager.withRepository(this.userRp).update({id:model.student},{status_license:TypeActive})
        await queryRunner.commitTransaction()
      }else{
        error = true;
        ExceptionErrorAmountinsufficient(new Error("El tiempo de duracion no puede ser mayor que el restante"));
      }
    } catch (err) {
      await queryRunner.rollbackTransaction()
      if(error){
        ExceptionErrorAmountinsufficient(new Error("El tiempo de duracion no puede ser mayor que el restante"));
      }else{
        ExceptionErrorMessage(err);
      }
    } finally {
      await queryRunner.release()
    }
  }

  async getListCompany() {
    const res = await this.datasource
      .createQueryBuilder()
      .select('user.id','id')
      .addSelect('COUNT(license.companyId)', 'cantidad')
      .addSelect('user.company_name','company_name')
      .from(UserEntity, 'user')
      .leftJoin(LicenseEntity, 'license', 'license.companyId = user.id')
      .groupBy('license.companyId')
      .addGroupBy('user.company_name')
      .addGroupBy('user.id')
      .where(`"user"."rol" = '${TypeCompany}'`)
      .getRawMany()
    return res
  }

  async getListLicenseByCompany(id: any) {
    const res = await this.datasource
      .createQueryBuilder()
      .select('license.id','id')
      .addSelect('license.name','name')
      .addSelect('license.duration_full','duration_full')
      .addSelect('license.duration_rest','duration_rest')
      .addSelect('license.time_start','time_start')
      .addSelect('license.time_left','time_left')
      .addSelect('license.studentId', 'student_id')
      .addSelect('user.name', 'student_name')
      .addSelect('user.lastName', 'student_last_name')
      .from(LicenseEntity, 'license')
      .leftJoin(UserEntity, 'user', 'license.studentId = user.id')
      .where(`"license"."companyId"='${id}'`)
      .getRawMany()
    return res;

  }
}
