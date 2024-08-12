import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { group } from 'console';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { ScheduleEntity } from 'src/database/entity/schedule/schedule-entity';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { Days, StatusGroupInactive } from 'src/util/constants';
import { ExceptionErrorMessage, NotFoundErrorMessage } from 'src/validation/exception-error';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(GroupEntity) private readonly groupRp: Repository<GroupEntity>,
    @InjectRepository(ScheduleEntity) private readonly scheduleRp: Repository<ScheduleEntity>,
    @InjectRepository(UserEntity) private readonly userRp: Repository<UserEntity>,
    @InjectRepository(LevelEntity) private readonly levelRp: Repository<LevelEntity>,
    private datasource: DataSource) { }


  async getGroups(){
    return await this.groupRp.find({select:{id:true,start_time:true,end_time:true,type:true,name:true,level:{name:true},teacher:{name:true,lastName:true}},relations:{teacher:true, level:true},order:{id:"DESC"}});
  }


  async saveGroup(model) {
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

      const grp = await queryRunner.manager.withRepository(this.groupRp).save(model)

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


  async updateGroup(model, id) {
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

      await queryRunner.manager.withRepository(this.scheduleRp).delete({ group: id })

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
       await this.groupRp.findOneByOrFail({id:id})
       await this.groupRp.update({id:id},{status:StatusGroupInactive})
    } catch (err) {
      NotFoundErrorMessage(err)
    }
  }




}