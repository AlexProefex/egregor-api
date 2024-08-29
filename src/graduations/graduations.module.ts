import { Module } from '@nestjs/common';
import { GraduationsService } from './graduations.service';
import { GraduationsController } from './graduations.controller';
import { GraduationsEntity } from 'src/database/entity/graduations/graduations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user/user-entity';

@Module({
  imports:[TypeOrmModule.forFeature([GraduationsEntity,UserEntity])],
  controllers: [GraduationsController],
  providers: [GraduationsService],
})
export class GraduationsModule {}
