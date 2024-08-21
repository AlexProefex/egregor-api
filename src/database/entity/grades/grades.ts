import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { GroupEntity } from '../group/group-entity';

@Entity('grades')
export class GradesEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => GroupEntity, (group) =>  group.grades, { onDelete: "CASCADE" })
    @JoinColumn()
    group:GroupEntity
 
}