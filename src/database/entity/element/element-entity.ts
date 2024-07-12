
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinTable} from 'typeorm';
import { SectionEntity } from '../section/section-entity';
import { QuestionEntity } from '../question/question-entity';
import { text } from 'stream/consumers';

@Entity('element')
export class ElementEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({ nullable: true})
    type:string;
    @Column({ nullable: true})
    title:string;
    @Column({ nullable: true, type:"text"})
    content:string;
    @Column({ nullable: true})
    description:string;
    @Column({ nullable: true})
    content_pdf:string;
    @Column({ nullable: true})
    type_icon:string;
    @Column({ nullable: true, type:"text"})
    embed:string;
    /*@Column({ nullable: true})
    image:string;*/
    @Column({ nullable: true})
    url:string;
    @Column({ nullable: true})
    time:string;
    @Column({ nullable: true})
    name:string;
    @Column({ nullable: true})
    idReference:number;

    @ManyToOne(()=>SectionEntity, (section)=> section.element, { onDelete:"CASCADE"})
    @JoinTable()
    section:SectionEntity


}
