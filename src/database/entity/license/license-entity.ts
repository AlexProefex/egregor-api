import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user-entity";
import { StatusInactiveLicense, TypeInactive } from "src/util/constants";




@Entity('license')
export class LicenseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    name:string;

    @Column({ nullable: true})
    duration_full:number;

    @Column({ nullable: true})
    duration_use:number;

    @Column({ nullable: true})
    duration_rest:number;

    @Column({ nullable: true})
    type:string;

    @Column({ nullable: true})
    time_start:Date;

    @Column({ nullable: true})
    time_left:Date;
    
    @Column({ default: StatusInactiveLicense})
    status:string;

    @ManyToOne(() => UserEntity, (company) => company.license, {nullable:true})
    @JoinTable()
    company: UserEntity[]

    @OneToOne(() => UserEntity, (stundent) =>  stundent.id, {nullable:true})
    @JoinColumn()
    student:UserEntity

}


