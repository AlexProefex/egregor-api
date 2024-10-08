import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { GroupEntity } from '../group/group-entity';

@Entity('scores')
export class ScoresEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => GroupEntity, (group) =>  group.scores, { onDelete: "CASCADE" })
    @JoinColumn()
    group:GroupEntity
 
}