import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import { ScheduleEntity } from 'src/database/entity/schedule/schedule-entity';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { Days, StatusActiveLicense, StatusFinalizedLicense, StatusGroupInactive, StatusInactiveLicense, StatusStopLicense, TypeActive, TypeB2B, TypeB2B2C, TypeB2C, TypesGroupClose, TypesGroupOpen } from 'src/util/constants';
import {ErrorTypeLicenseExpired, ErrorTypeLicenseNotFound} from 'src/util/message.errors'
import { ExceptionErrorMessage, ExceptionErrorMessageDynamic, NotFoundErrorMessage } from 'src/validation/exception-error';
import { DataSource, Repository } from 'typeorm';
import { DateTime } from "luxon";
import { ClassesEntity } from 'src/database/entity/classes/classes';
import { GraduationsEntity } from 'src/database/entity/graduations/graduations';



@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(GroupEntity) private readonly groupRp: Repository<GroupEntity>,
    @InjectRepository(ScheduleEntity) private readonly scheduleRp: Repository<ScheduleEntity>,
    @InjectRepository(UserEntity) private readonly userRp: Repository<UserEntity>,
    @InjectRepository(LevelEntity) private readonly levelRp: Repository<LevelEntity>,
    @InjectRepository(LicenseEntity) private readonly licenseRp: Repository<LicenseEntity>,
    @InjectRepository(ClassesEntity) private readonly classesRp: Repository<ClassesEntity>,
    @InjectRepository(GraduationsEntity) private readonly graduationRp: Repository<GraduationsEntity>,

    private datasource: DataSource) { }


  async getGroups() {
    return await this.groupRp.find({ select: { id: true, start_time: true, end_time: true, type: true, name: true, status: true, level: { name: true }, teacher: { name: true, lastName: true } }, relations: { teacher: true, level: true }, order: { id: "DESC" } });
  }

  async getGroupsByID(id: number) {
    const countGroup = await this.userRp.find({ where: { id_group: id } })
    const group = await this.datasource.createQueryBuilder()
      .select('group.id', 'id')
      .addSelect('group.group_number', 'group_number')
      .addSelect('group.start_time', 'start_time')
      .addSelect('group.end_time', 'end_time')
      .addSelect('group.type', 'type')
      .addSelect('group.status', 'status')
      .addSelect('group.level', 'level')
      .addSelect('group.teacher', 'teacher')
      .addSelect('group.duration', 'duration')
      .addSelect('group.company', 'company')
      .from(GroupEntity, 'group')
      .where(`"group"."id" = ${id}`)
      .getRawOne()

    const schedule = await this.datasource.createQueryBuilder()
      .select('schedule.id', 'id')
      .addSelect('schedule.day', 'day')
      .addSelect('schedule.start_time', 'start_time')
      .addSelect('schedule.end_time', 'end_time')
      .from(ScheduleEntity, 'schedule')
      .where(`"schedule"."groupId" = ${id}`)
      .getRawMany()
    if (countGroup.length == 0) {
      group.schedule = schedule
    }
    return group;
  }
  async getTeacherGroups(id: number) {
    return await this.groupRp.find({ where: { teacher: { id: id } } })
  }

  async getStudentsOnGroup(id: number) {
    return await this.userRp.find({ select: { id: true, name: true, lastName: true }, where: { id_group: id } })
    //return await this.groupRp.find({ select: { id: true, start_time: true, end_time: true, type: true, name: true, level: { name: true }, teacher: { name: true, lastName: true } }, relations: { teacher: true, level: true }, order: { id: "DESC" } });
  }


  async saveGroupClose(model) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const { schedule, ...group } = model

      const level = await queryRunner.manager.withRepository(this.levelRp).findOneBy({ id: group.level })
      const company = await queryRunner.manager.withRepository(this.userRp).findOneBy({ id: group.company })
      let days = ""
      schedule.forEach(element => {
        days = `${days}${Days[element.day]}`
      });
      model.name = `${company.company_name}-${group.group_number}-${level.name}-${days}`

      const start_time = new Date(model.start_time);
      const end_time = new Date(model.end_time);

      const startTime = DateTime.fromISO(start_time.toISOString());
      const endTime = DateTime.fromISO(end_time.toISOString());
      const diffInDays = endTime.diff(startTime, 'days');

      const grp = await queryRunner.manager.withRepository(this.groupRp).save(model)

      for (let i = 0; i <= diffInDays.toObject().days; i++) {
        const fullDay = startTime.plus({ days: i }).toFormat('E')
        const isDay = !!schedule.find((element) => parseInt(element.day) == parseInt(fullDay));
        if (isDay) {


          const full_date = startTime.plus({ days: i }).toFormat('DDDD');
          const full_date_iso = startTime.plus({ days: i }).toISODate();

          const objectSelected = schedule.find(obj => parseInt(obj.day) == parseInt(fullDay));

          await queryRunner.manager.withRepository(this.classesRp).save({
            date: full_date,
            start_time: objectSelected.start_time,
            end_time: objectSelected.end_time,
            date_iso: full_date_iso,
            group: grp.id
          })
        }
      }

      schedule.forEach(async (element) => {
        element.group = grp.id
        await queryRunner.manager.withRepository(this.scheduleRp).save(element)
      });

      await queryRunner.commitTransaction()
    } catch (err) {
      console.log(err)
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err)
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
  }


  async saveGroupOpen(model) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const { schedule, ...group } = model

      const level = await queryRunner.manager.withRepository(this.levelRp).findOneBy({ id: group.level })
      let days = ""
      schedule.forEach(element => {
        days = `${days}${Days[element.day]}`
      });
      model.name = `Egregor-${group.group_number}-${level.name}-${days}`

      const startTime = DateTime.now();
      const endTime = startTime.plus({ days: model.duration * 7 })
      const diffInDays = endTime.diff(startTime, 'days');

      const grp = await queryRunner.manager.withRepository(this.groupRp).save(model)

      for (let i = 0; i <= diffInDays.toObject().days; i++) {
        const fullDay = startTime.plus({ days: i }).toFormat('E')
        const isDay = !!schedule.find((element) => parseInt(element.day) == parseInt(fullDay));
        if (isDay) {

          const full_date = startTime.plus({ days: i }).toFormat('DDDD');
          const full_date_iso = startTime.plus({ days: i }).toISODate();

          const objectSelected = schedule.find(obj => parseInt(obj.day) == parseInt(fullDay));

          await queryRunner.manager.withRepository(this.classesRp).save({
            date: full_date,
            start_time: objectSelected.start_time,
            end_time: objectSelected.end_time,
            date_iso: full_date_iso,
            group: grp.id
          })
        }
      }

      schedule.forEach(async (element) => {
        element.group = grp.id
        await queryRunner.manager.withRepository(this.scheduleRp).save(element)
      });

      await queryRunner.commitTransaction()
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err)
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
  }


  async updateGroupClose(model, id) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const { schedule, ...group } = model

      //const currentGroup = await queryRunner.manager.withRepository(this.groupRp).findOneBy({id:id})
      const level = await queryRunner.manager.withRepository(this.levelRp).findOneBy({ id: group.level })
      const company = await queryRunner.manager.withRepository(this.userRp).findOneBy({ id: group.company })
      let days = ""
      schedule.forEach(element => {
        days = `${days}${Days[element.day]}`
      });

      model.name = `${company.company_name}-${group.group_number}-${level.name}-${days}`

      await queryRunner.manager.withRepository(this.groupRp).update({ id: id }, group)

      await queryRunner.manager.withRepository(this.scheduleRp).delete({ group: { id: id } })
      await queryRunner.manager.withRepository(this.classesRp).delete({ group: { id: id } })

      //await queryRunner.manager.withRepository(this.classesRp).delete({group:{id:id}})


      console.log(model.start_time)
      console.log(model.end_time)
      const start_time = new Date(model.start_time);
      const end_time = new Date(model.end_time);


      const startTime = DateTime.fromISO(start_time.toISOString());
      const endTime = DateTime.fromISO(end_time.toISOString());
      const diffInDays = endTime.diff(startTime, 'days');

      const grp = await queryRunner.manager.withRepository(this.groupRp).findOneBy({ id: id })

      for (let i = 0; i <= diffInDays.toObject().days; i++) {
        const fullDay = startTime.plus({ days: i }).toFormat('E')
        const isDay = !!schedule.find((element) => parseInt(element.day) == parseInt(fullDay));
        if (isDay) {
          const full_date = startTime.plus({ days: i }).toFormat('DDDD');
          const full_date_iso = startTime.plus({ days: i }).toISODate();

          const objectSelected = schedule.find(obj => parseInt(obj.day) == parseInt(fullDay));

          await queryRunner.manager.withRepository(this.classesRp).save({
            date: full_date,
            start_time: objectSelected.start_time,
            end_time: objectSelected.end_time,
            date_iso: full_date_iso,
            group: { id: grp.id }
          })
        }
      }
      schedule.forEach(async (element) => {
        element.group = grp.id
        await queryRunner.manager.withRepository(this.scheduleRp).save(element)
      });
      await queryRunner.commitTransaction()
    } catch (err) {
      console.log(err)
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err)
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
  }


  async updateGroupOpen(model, id) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const { schedule, ...group } = model

      //const currentGroup = await queryRunner.manager.withRepository(this.groupRp).findOneBy({id:id})
      const level = await queryRunner.manager.withRepository(this.levelRp).findOneBy({ id: group.level })
      let days = ""
      schedule.forEach(element => {
        days = `${days}${Days[element.day]}`
      });

      model.name = `Egregor-${group.group_number}-${level.name}-${days}`

      await queryRunner.manager.withRepository(this.groupRp).update({ id: id }, group)

      await queryRunner.manager.withRepository(this.scheduleRp).delete({ group: { id: id } })

      await queryRunner.manager.withRepository(this.classesRp).delete({ group: { id: id } })

      const startTime = DateTime.now();
      const endTime = startTime.plus({ days: model.duration * 7 })
      const diffInDays = endTime.diff(startTime, 'days');

      const grp = await queryRunner.manager.withRepository(this.groupRp).findOneBy({ id: id })

      for (let i = 0; i <= diffInDays.toObject().days; i++) {
        const fullDay = startTime.plus({ days: i }).toFormat('E')
        const isDay = !!schedule.find((element) => parseInt(element.day) == parseInt(fullDay));
        if (isDay) {

          const full_date = startTime.plus({ days: i }).toFormat('DDDD');
          const full_date_iso = startTime.plus({ days: i }).toISODate();

          const objectSelected = schedule.find(obj => parseInt(obj.day) == parseInt(fullDay));

          await queryRunner.manager.withRepository(this.classesRp).save({
            date: full_date,
            start_time: objectSelected.start_time,
            end_time: objectSelected.end_time,
            date_iso: full_date_iso,
            group: { id: grp.id }
          })
        }
      }

      schedule.forEach(async (element) => {
        element.group = id
        await queryRunner.manager.withRepository(this.scheduleRp).save(element)
      });

      await queryRunner.commitTransaction()
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err)
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
  }

  async disableGroup(id) {
    try {
      await this.groupRp.findOneByOrFail({ id: id })
      await this.groupRp.update({ id: id }, { status: StatusGroupInactive })
      await this
    } catch (err) {
      NotFoundErrorMessage(err)
    }
  }

  async addUstudentToGroup(model) {

    let msg = null
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const group = await queryRunner.manager.withRepository(this.groupRp).findOneBy({ id: model.group_number })
      const user = await queryRunner.manager.withRepository(this.userRp).findOne({ where: { id: model.student } })
      console.log(group)
      // Grupo Cerrado
      if (group.type == TypesGroupClose && group.company === user.company) {
        await queryRunner.manager.withRepository(this.userRp).save({ id_group: group.id, status_license: StatusActiveLicense })
        const graduations = await queryRunner.manager.withRepository(this.graduationRp).findOne({ where: { student: { id: model.student }, group: { id: model.group_number } } })
        if (!!graduations) {
          await queryRunner.manager.withRepository(this.graduationRp).update({ id: graduations.id }, { student: model.student, group: model.group_number, time_start:group.start_time, time_end:group.end_time })
        } else {
          await queryRunner.manager.withRepository(this.graduationRp).save({ student: model.student, group: model.group_number, time_start:group.start_time, time_end:group.end_time })
        }
      } else if (group.type == TypesGroupOpen) {
        const license = await queryRunner.manager.withRepository(this.licenseRp).findOne({ where: { student: { id: model.student } } })
        console.log(license)
        if (!license) { msg = ErrorTypeLicenseNotFound; throw new Error()}
        const currentDate = DateTime.now()
        console.log(currentDate)

        const end_time = new Date(license.time_left)
        const endTime = DateTime.fromISO(end_time.toISOString());

        const diffInDays = endTime.diff(currentDate, 'days');
        diffInDays.toObject();
        if (user.type_student == TypeB2B) {
          if (Math.ceil(diffInDays?.values?.days || 0) > 0) {
            await queryRunner.manager.withRepository(this.userRp).update({ id: user.id }, { id_group: group.id })
            const graduations = await queryRunner.manager.withRepository(this.graduationRp).findOne({ where: { student: { id: model.student }, group: { id: model.group_number } } })
            if (!!graduations) {
              await queryRunner.manager.withRepository(this.graduationRp).update({ id: graduations.id }, { student: model.student, group: model.group_number, time_start:model.time_start, time_end:model.time_end })
            } else {
              await queryRunner.manager.withRepository(this.graduationRp).save({ student: model.student, group: model.group_number, time_start:model.time_start, time_end:model.time_end })
            }
          } else {
            await queryRunner.manager.withRepository(this.licenseRp).update({ id: license.id }, { status: StatusFinalizedLicense })
            msg = ErrorTypeLicenseExpired; throw new Error()
          }

        } else if (user.type_student == TypeB2C) {
          if (license.status == StatusActiveLicense) {
            await queryRunner.manager.withRepository(this.userRp).update({ id: user.id }, { id_group: group.id })
            const graduations = await queryRunner.manager.withRepository(this.graduationRp).findOne({ where: { student: { id: model.student }, group: { id: model.group_number } } })
            if (!!graduations) {
              await queryRunner.manager.withRepository(this.graduationRp).update({ id: graduations.id }, { student: model.student, group: model.group_number , time_start:model.time_start, time_end:model.time_end})
            } else {
              await queryRunner.manager.withRepository(this.graduationRp).save({ student: model.student, group: model.group_number, time_start:model.time_start, time_end:model.time_end })
            }
          } else {
            msg = ErrorTypeLicenseNotFound; throw new Error()
          }
        }
      }

      //Grupo Abierto
      /*if(group.type == TypesGroupOpen) {
        
        if (user.type_student == TypeB2B && (user.status_license == StatusStopLicense || user.status_license == StatusInactiveLicense) && user.id_group == 0) {
  
          const startTime = DateTime.fromISO(group.start_time.toISOString().split("T")[0]);
          const endTime = DateTime.fromISO(group.end_time.toISOString().split("T")[0]);
  
          const diffInMonths = endTime.diff(startTime, 'months');
          diffInMonths.toObject();
          const rest_time_group = Math.ceil(diffInMonths?.values?.months)
          let updateLicence = Object.assign({}, license)
  
          if (license.duration_rest > rest_time_group && rest_time_group > 0) {
            updateLicence.duration_rest = license.duration_rest - rest_time_group;
            const newEndDate = startTime.plus({ months: rest_time_group });
            updateLicence.time_start = new Date(startTime.toUTC().toISO())
            updateLicence.time_left = new Date(newEndDate.toUTC().toISO())
            updateLicence.status = TypeActive
            user.status_license = StatusActiveLicense
  
          } else {
            updateLicence.duration_rest = 0;
            const newEndDate = startTime.plus({ months: license.duration_rest });
            updateLicence.time_start = new Date(startTime.toUTC().toISO())
            updateLicence.time_left = new Date(newEndDate.toUTC().toISO())
            updateLicence.status = TypeActive
            user.status_license = StatusActiveLicense
          }
  
          await queryRunner.manager.withRepository(this.licenseRp).update({ id: license.id }, {
            time_start: updateLicence.time_start,
            time_left: updateLicence.time_left,
            duration_rest: updateLicence.duration_rest,
            status: updateLicence.status
          })
  
         /* const graduations = await queryRunner.manager.withRepository(this.graduationRp).findOne({where:{student:{id:model.student}, group:{id:model.group_number}}})
          if(!!graduations){
            await queryRunner.manager.withRepository(this.graduationRp).update({id:graduations.id},{student:model.student,group:model.group_number})
          } else{
            await queryRunner.manager.withRepository(this.graduationRp).save({student:model.student,group:model.group_number})
          }*/

      //console.log(graduations)
      /*
              await queryRunner.manager.withRepository(this.userRp).update({ id: user.id }, {
                id_group: group.id,
                status_license: user.status_license
              })
            }
            else if ((user.type_student == TypeB2C) && (user.status_license == StatusStopLicense || user.status_license == StatusInactiveLicense)) {
             /* const current = license.time_start.toISOString().split("T")[0] + 'T00:00:00';
              const startTime = DateTime.fromISO(current);
              const newEndDate = startTime.plus({ months: 1 });
      
              console.log(startTime.toUTC().toISO())
              await queryRunner.manager.withRepository(this.licenseRp).update({ id: license.id }, {
                time_start: new Date(startTime.toUTC().toISO()),
                time_left: new Date(newEndDate.toUTC().toISO()),
                status: StatusActiveLicense
              })
      */
      /*const graduations = await queryRunner.manager.withRepository(this.graduationRp).findOne({where:{student:{id:model.student}, group:{id:model.group_number}}})
      if(!!graduations){
        await queryRunner.manager.withRepository(this.graduationRp).update({id:graduations.id},{student:model.student,group:model.group_number})
      } else{
        await queryRunner.manager.withRepository(this.graduationRp).save({student:model.student,group:model.group_number})
      }
 
      console.log(graduations)
      */

      /*    await queryRunner.manager.withRepository(this.userRp).update({ id: user.id }, {
            id_group: group.id,
            status_license: StatusActiveLicense
          })
  
        }
      }
  */

      await queryRunner.commitTransaction()
      await queryRunner.release()

    } catch (err) {
      console.log(msg)
      console.log(err)
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      ExceptionErrorMessageDynamic(msg||err)
    }
  }


  async changeGroupStudent(model: any) {
    await this.userRp.update({ id: model.student }, { id_group: model.group_number })
  }

  async detailGroupById(id: number) {
    return await this.datasource.createQueryBuilder()
      .select('group.id', 'id')
      .addSelect('group.name', 'name')
      .addSelect('group.status', 'status')
      .addSelect('group.microsoft_team_url', 'microsoft_team_url')
      .addSelect('group.type', 'type')
      .from(GroupEntity, 'group')
      .where(`"group"."id" = ${id}`)
      .getRawMany()
  }


  async deleteStudentGroup(model: any) {
    return await this.userRp.update({ id: model.student }, { id_group: 0 })
  }

  async deleteGroup(id: number) {
    return await this.groupRp.delete({ id: id })
  }

}
