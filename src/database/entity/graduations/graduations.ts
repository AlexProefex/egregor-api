import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { GroupEntity } from '../group/group-entity';

@Entity('graduations')
export class GraduationsEntity {

    @PrimaryGeneratedColumn()
    id:number;

    
    @ManyToOne(() => GroupEntity, (group) =>  group.graduations, { onDelete: "CASCADE" })
    @JoinColumn()
    group:GroupEntity
 
}