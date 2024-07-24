import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany, JoinColumn} from 'typeorm';
import { ScheduleEntity } from '../schedule/schedule-entity';
import { UserEntity } from '../user/user-entity';
import { LevelEntity } from '../level/level-entity';

@Entity('group')
export class GroupEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    company:string;

    @Column({ nullable: true})
    start_time:Date;

    @Column({ nullable: true})
    end_time:Date;

    @Column({ nullable: true})
    status:string;

    @ManyToOne(() => LevelEntity, (level) =>  level.group, {nullable:true})
    @JoinColumn()
    level:UserEntity

    @ManyToOne(() => UserEntity, (teacher) =>  teacher.group, {nullable:true})
    @JoinColumn()
    teacher:UserEntity

    @OneToMany(()=>ScheduleEntity, (schedule)=> schedule.group)
    schedule:ScheduleEntity

}
