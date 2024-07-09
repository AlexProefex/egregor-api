
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne} from 'typeorm';
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
    points:string;
    @Column({ nullable: true})
    description:string;
    @Column({ nullable: true})
    option:string;
    @Column({ nullable: true})
    answer:string;
    @Column({ nullable: true})
    imagen:string;

    @ManyToOne(()=>QsectionEntity, (quiz) => quiz.question)
    qsection:QsectionEntity

}


