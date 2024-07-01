
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    fullName:string;
    
    @Column({ unique: true })
    email:string;
    
    @Column()
    password:string;

    @Column({ nullable: true})
    type_contract:string;

    @Column({ nullable: true})
    tariff:string;

    @Column({ nullable: true})
    paypal_link:string;

    @Column({ nullable: true})
    carnet:string;

    @Column({ nullable: true})
    type_student:string;

    @Column({ nullable: true})
    company:string;

    @Column({ nullable: true})
    curp:string;

    @Column({ nullable: true})
    phone:string;

    @Column({ nullable: true})
    description:string;

    @Column()
    rol:string;

    @Column({default:"inactivo"})
    status_license:string;

    @CreateDateColumn()
    createdAt:Date;

    @Column({ nullable: true})
    avatar:string;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

}
