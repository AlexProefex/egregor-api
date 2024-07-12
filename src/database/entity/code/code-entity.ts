
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity('code')
export class CodeEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    userId:number;
    
    @Column()
    securityCode:string;
}
