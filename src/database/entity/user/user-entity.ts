
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinTable, OneToOne, JoinColumn, ManyToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LicenseEntity } from '../license/license-entity';
import { GroupEntity } from '../group/group-entity';
import { DirectionEntity } from '../direction/direction';
import { BankEntity } from '../bank/bank';
import { GraduationsEntity } from '../graduations/graduations';


@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    name:string;

    @Column({ nullable: true})
    lastName:string;
    
    @Column({ unique: true })
    email:string;
    
    @Column()
    password:string;

    @Column({ nullable: true})
    type_contract:string;

    @Column({ nullable: true})
    tariff:number;

    /*@Column({ nullable: true})
    paypal_link:string;*/

    @Column({ nullable: true})
    carnet_id:string;

    @Column({ nullable: true})
    type_student:string;

    @Column({ nullable: true})
    company:number;

    @Column({ nullable: true})
    curp:string;

    @Column({ nullable: true})
    phone:string;

    @Column({ nullable: true,type:"text"})
    description:string;

    @Column()
    rol:string;

    @Column({default:"inactivo"})
    status_license:string;

    @Column({default:"inactivo"})
    status_login:string;

    @CreateDateColumn()
    createdAt:Date;

    @Column({ nullable: true})
    avatar:string;

    @Column({ nullable: true})
    representative:string;

    @Column({ nullable: true})
    comercial_brand:string;

    @Column({ nullable: true})
    business_name:string;
    
    @Column({ nullable: true})
    country:string;

    @Column({ nullable: true})
    fiscal_rcf:string;

    @Column({ nullable: true})
    company_name:string;

    @Column({ nullable: true, default:0})
    id_group:number;
    
    @OneToMany(() => LicenseEntity, (license)=> license.company,{ nullable:true})
    license:LicenseEntity

    @OneToMany(() => GroupEntity, (group)=> group.teacher,{ nullable:true})
    group:LicenseEntity


    @OneToOne(() => DirectionEntity, (direction) =>  direction.id, {nullable:true})
    @JoinColumn()
    direction:DirectionEntity

    @OneToOne(() => BankEntity, (bank) =>  bank.id, {nullable:true})
    @JoinColumn()
    bank:BankEntity

    @OneToMany(() => GraduationsEntity, (graduations) =>  graduations.student)
    @JoinTable()
    graduations:GraduationsEntity

/*    @OneToOne(() => LicenseEntity )
    @JoinColumn()
    license:LicenseEntity
*/
    /*@OneToOne(() => LicenseEntity, (student) => student.student,{nullable:true})
    student:UserEntity
    */
    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
    








}
