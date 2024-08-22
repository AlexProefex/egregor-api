import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesEntity } from 'src/database/entity/classes/classes';

@Module({
  imports:[TypeOrmModule.forFeature([ClassesEntity])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
