import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { GroupEntity } from '../group/group-entity';

@Entity('assistance')
export class AssistanceEntity {

    @PrimaryGeneratedColumn()
    id:number;



 
}