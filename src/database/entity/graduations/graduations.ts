import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { GroupEntity } from '../group/group-entity';
import { UserEntity } from '../user/user-entity';

@Entity('graduations')
export class GraduationsEntity {

    @PrimaryGeneratedColumn()
    id:number;


    @ManyToOne(() => UserEntity, (user) =>  user.graduations)
    @JoinColumn()
    student:UserEntity
    
    @Column({ nullable: true})
    time_start:Date;

    @Column({ nullable: true})
    time_end:Date;
    
    @ManyToOne(() => GroupEntity, (group) =>  group.graduations, { onDelete: "CASCADE" })
    @JoinColumn()
    group:GroupEntity



 
}