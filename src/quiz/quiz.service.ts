import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { Repository } from 'typeorm';
import { removeNUllValues } from 'src/util/custom';
import { ExceptionErrorMessage } from 'src/validation/exception-error';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(QuizEntity)
  private readonly quizRp: Repository<QuizEntity>) {
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
                type:true
              

              },
            }
          }
          , where:{
            id:id
          }
        });


      return removeNUllValues(result)


    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

}
