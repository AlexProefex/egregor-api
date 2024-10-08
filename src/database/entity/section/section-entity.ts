
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinTable} from 'typeorm';
import { UnitEntity } from '../unit/unit-entity';
import { ElementEntity } from '../element/element-entity';

@Entity('section')
export class SectionEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    type:string;
    
    @Column({ nullable: true})
    time:number;

    @Column({ nullable: true})
    idReference:number;

    @ManyToOne(()=>UnitEntity, (unit)=> unit.section, { onDelete:"CASCADE"})
    @JoinTable()
    unit:UnitEntity

    @OneToMany(() => ElementEntity, (element) => element.section)
    element: ElementEntity[]

}
