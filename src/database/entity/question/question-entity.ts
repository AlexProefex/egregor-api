
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinTable} from 'typeorm';
import { QuizEntity } from '../quiz/quiz-entity';
import { QsectionEntity } from '../qsection/qsection-entity';



@Entity('question')
export class QuestionEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    type:string;

    @Column({ nullable: true})
    title:string;

    @Column({ nullable: true})
    points:number;

    @Column({ nullable: true, type:"text"})
    description:string;

    @Column({ nullable: true, type:"text", array:true})
    option:string;

    @Column({ nullable: true, type:"text", array:true})
    answer:string;

    @Column({ nullable: true, type:"text"})
    embed:string;

    @Column({ nullable: true})
    url:string;

    @Column({ nullable: true})
    order:number;
    
    @ManyToOne(()=>QsectionEntity, (quiz) => quiz.question,{ onDelete:"CASCADE"})
    @JoinTable()
    question:QsectionEntity

}


