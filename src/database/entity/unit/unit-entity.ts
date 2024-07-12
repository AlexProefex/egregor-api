
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinTable} from 'typeorm';
import { LevelEntity } from '../level/level-entity';
import { SectionEntity } from '../section/section-entity';

@Entity('unit')
export class UnitEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    /*
    @ManyToOne(() => BlogEntity, (blog) => blog.blogDetail)
    blog: BlogEntity
*/
    @ManyToOne(()=>LevelEntity, (level)=> level.unit, {onDelete:"CASCADE"})
    @JoinTable()
    level:LevelEntity

    @OneToMany(() => SectionEntity, (section) => section.unit)
    section: SectionEntity[]


}
