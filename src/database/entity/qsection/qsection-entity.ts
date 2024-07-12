
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinTable} from 'typeorm';
import { QuizEntity } from '../quiz/quiz-entity';
import { QuestionEntity } from '../question/question-entity';



@Entity('qsection')
export class QsectionEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column({ nullable: true})
    name:string;

    @ManyToOne(()=>QuizEntity, (quiz)=> quiz.qsection,{ onDelete:"CASCADE"})
    @JoinTable()
    quiz:QuizEntity

    @OneToMany(() => QuestionEntity, (question) => question.question)
    question: QuestionEntity[]

}


