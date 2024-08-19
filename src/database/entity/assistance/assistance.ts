import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('assistance')
export class AssistanceEntity {

    @PrimaryGeneratedColumn()
    id:number;
 
}