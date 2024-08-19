import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany, JoinColumn} from 'typeorm';
import { ScheduleEntity } from '../schedule/schedule-entity';
import { UserEntity } from '../user/user-entity';
import { LevelEntity } from '../level/level-entity';
import { IsEnum } from 'class-validator';
import { TypeInactive, TypesGroup } from 'src/util/constants';

@Entity('group')
export class GroupEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    company:number;

    @Column({ nullable: true})
    start_time:Date;

    @Column({ nullable: true})
    end_time:Date;
    
    @Column({ nullable: true})
    group_number:string;

    @Column({ nullable: true})
    type:string;

    @Column({ nullable: true,default:TypeInactive})
    status:string;

    @Column({ nullable: true})
    name:string;

    @Column({ nullable: true})
    microsoft_team_url:string;

    @Column({ nullable: true})
    duration:number;

    @ManyToOne(() => LevelEntity, (level) =>  level.group, {nullable:true})
    @JoinColumn()
    level:UserEntity

    @ManyToOne(() => UserEntity, (teacher) =>  teacher.group, {nullable:true})
    @JoinColumn()
    teacher:UserEntity

    @OneToMany(()=>ScheduleEntity, (schedule)=> schedule.group)
    schedule:ScheduleEntity

}
