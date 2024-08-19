import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('classes')
export class ClassesEntity {

    @PrimaryGeneratedColumn()
    id:number;
 
}