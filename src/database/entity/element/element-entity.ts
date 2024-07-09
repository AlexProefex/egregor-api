
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne} from 'typeorm';
import { SectionEntity } from '../section/section-entity';
import { QuestionEntity } from '../question/question-entity';

@Entity('element')
export class ElementEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({ nullable: true})
    type:string;
    @Column({ nullable: true})
    title:string;
    @Column({ nullable: true})
    content:string;
    @Column({ nullable: true})
    description:string;
    @Column({ nullable: true})
    content_pdf:string;
    @Column({ nullable: true})
    type_icon:string;
    @Column({ nullable: true})
    embed:string;
    @Column({ nullable: true})
    imagen:string;
    @Column({ nullable: true})
    url:string;
    @Column({ nullable: true})
    time:string;

    @Column({ nullable: true})
    idReference:number;

    @ManyToOne(()=>SectionEntity, (section)=> section.element)
    section:SectionEntity


}
