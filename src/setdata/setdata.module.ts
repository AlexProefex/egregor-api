import { Module } from '@nestjs/common';
import { SetdataService } from './setdata.service';
import { SetdataController } from './setdata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { LevelService } from 'src/level/level.service';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { UserService } from 'src/users/users.service';
import { DirectionEntity } from 'src/database/entity/direction/direction';
import { BankEntity } from 'src/database/entity/bank/bank';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { token } from 'src/users/token.service';
import { JwtService } from '@nestjs/jwt';
import { GroupService } from 'src/group/group.service';
import { LicenseService } from 'src/license/license.service';
import { ScheduleEntity } from 'src/database/entity/schedule/schedule-entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ClassesEntity } from 'src/database/entity/classes/classes';
import { GraduationsEntity } from 'src/database/entity/graduations/graduations';


@Module({
  imports:[TypeOrmModule.forFeature([LevelEntity, UserEntity, DirectionEntity, BankEntity, LicenseEntity, GroupEntity,ScheduleEntity,ClassesEntity,GraduationsEntity])],
  controllers: [SetdataController],
  providers: [SetdataService, LevelService, UserService, token, JwtService, GroupService, LicenseService],

})
export class SetdataModule {}
