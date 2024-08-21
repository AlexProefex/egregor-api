import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { GroupEntity } from '../group/group-entity';

@Entity('classes')
export class ClassesEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => GroupEntity, (group) =>  group.classes, { onDelete: "CASCADE" })
    @JoinColumn()
    group:GroupEntity
 
}