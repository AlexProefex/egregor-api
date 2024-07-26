import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne} from 'typeorm';
import { GroupEntity } from '../group/group-entity';


@Entity('schedule')
export class ScheduleEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    day:number;

    @Column({ nullable: true})
    start_time:string;

    @Column({ nullable: true})
    end_time:string;

    @ManyToOne(()=>GroupEntity, (group)=> group.schedule)
    @JoinTable()
    group:GroupEntity
}
