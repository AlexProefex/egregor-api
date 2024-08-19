import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('grades')
export class GradesEntity {

    @PrimaryGeneratedColumn()
    id:number;
 
}