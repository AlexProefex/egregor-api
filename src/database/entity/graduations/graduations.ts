import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('graduations')
export class GraduationsEntity {

    @PrimaryGeneratedColumn()
    id:number;
 
}