import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { DataSource, Repository } from 'typeorm';
import { removeNUllValues } from 'src/util/custom';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { QsectionEntity } from 'src/database/entity/qsection/qsection-entity';
import { QuestionEntity } from 'src/database/entity/question/question-entity';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(QuizEntity)
  private readonly quizRp: Repository<QuizEntity>,
  private datasource:DataSource) {
  }


  async findQuiz(id: number) {
    try {

      const result = await this.quizRp.find(
        {
          relations: {
            qsection: {
              question: {
                
              }
            }
          },select:{
            name:true,
            time:true,
            type:true,
            id:true,
            qsection:{
              id:true,
              name:true,
              question:{
                id:true,
                description:true,
                option:true,
                answer:true,
                points:true,
                title:true,
                embed:true,
                url:true,
                type:true,
                order:true
              },
            }
          }
          ,where:{
            id:id
          }
          ,order:{
            id:"ASC",
            qsection:{
              id:"ASC",
              question:{
                order:"ASC"
              }
            }
          }
        });
      
      
      return removeNUllValues(result)


    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  async findPanel(id:number){
    const questions = await this.datasource.createQueryBuilder()
    .select('Count(question.id)', 'questions')
    .addSelect('SUM(question.points)','points')
    .from(QuizEntity, 'quiz')
    .innerJoin(QsectionEntity,"qsection","qsection.quizId = quiz.id")
    .innerJoin(QuestionEntity,"question","question.questionId = qsection.id")
    .where(`"quiz"."id" = ${id}`)
    .andWhere(`"question"."type" NOT IN ('image','text','movie') `)
    .getRawOne()

    const sections = await this.datasource.createQueryBuilder()
    .select('Count(qsection.id)', 'sections')
    .from(QuizEntity, 'quiz')
    .innerJoin(QsectionEntity,"qsection","qsection.quizId = quiz.id")
    .where(`"quiz"."id" = ${id}`)
    .getRawOne()

    const time = await this.datasource.createQueryBuilder()
    .select('quiz.time', 'time')
    .from(QuizEntity, 'quiz')
    .innerJoin(QsectionEntity,"qsection","qsection.quizId = quiz.id")
    .where(`"quiz"."id" = ${id}`)
    .getRawOne()

    Object.assign(questions, sections, time)
    return questions
    
  }

  async findBread(id:number){
    const questions = await this.datasource.createQueryBuilder()
    .select('Count(question.id)', 'questions')
    .addSelect('SUM(question.points)','points')
    .from(QuizEntity, 'quiz')
    .innerJoin(QsectionEntity,"qsection","qsection.quizId = quiz.id")
    .innerJoin(QuestionEntity,"question","question.questionId = qsection.id")
    .where(`"quiz"."id" = ${id}`)
    .andWhere(`"question"."type" NOT IN ('image','text','movie') `)
    .getRawOne()

    const sections = await this.datasource.createQueryBuilder()
    .select('Count(qsection.id)', 'sections')
    .from(QuizEntity, 'quiz')
    .innerJoin(QsectionEntity,"qsection","qsection.quizId = quiz.id")
    .where(`"quiz"."id" = ${id}`)
    .getRawOne()

    const time = await this.datasource.createQueryBuilder()
    .select('quiz.time', 'time')
    .from(QuizEntity, 'quiz')
    .innerJoin(QsectionEntity,"qsection","qsection.quizId = quiz.id")
    .where(`"quiz"."id" = ${id}`)
    .getRawOne()
    
    Object.assign(questions, sections, time)
    return questions
    
  }

}
