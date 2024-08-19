import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('scores')
export class ScoresEntity {

    @PrimaryGeneratedColumn()
    id:number;
 
}