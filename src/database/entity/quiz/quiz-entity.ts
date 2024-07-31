
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne} from 'typeorm';
import { QuestionEntity } from '../question/question-entity';
import { QsectionEntity } from '../qsection/qsection-entity';

@Entity('quiz')
export class QuizEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    type:string;

    @Column({ nullable: true})
    name:string;
    
    @Column({ nullable: true})
    time:string;

    @OneToMany(() => QsectionEntity, (qsection) => qsection.quiz)
    qsection: QsectionEntity[]

}


