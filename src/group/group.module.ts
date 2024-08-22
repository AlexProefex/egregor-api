import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { ScheduleEntity } from 'src/database/entity/schedule/schedule-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import moment from 'moment';
import { ClassesEntity } from 'src/database/entity/classes/classes';

@Module({
  imports:[TypeOrmModule.forFeature([GroupEntity, ScheduleEntity, LevelEntity, UserEntity, LicenseEntity, GroupEntity, ClassesEntity])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
