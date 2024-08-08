import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notEqual } from 'assert';
import { QsectionEntity } from 'src/database/entity/qsection/qsection-entity';
import { QuestionEntity } from 'src/database/entity/question/question-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Between, DataSource, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';


@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionEntity)
  private readonly questionRp: Repository<QuestionEntity>,
  @InjectRepository(QsectionEntity) private readonly qsectionRp: Repository<QsectionEntity>,
  private datasource:DataSource) {
  }


  //Obtener Level
  async findById(id: number) {
    try {
      return await this.questionRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }



  //Guardar Question
  async saveQuestion(questionData: any) {
    try {
      const position = await this.questionRp.count({ where: { question: {id:questionData.question}} })
      console.log(position,"gfdgfd", questionData.question)
      questionData.order = position + 1
      const test= await this.questionRp.save(questionData);
      console.log(test)
      return test
    } catch (error) {
      console.log(error)
      ExceptionErrorMessage(error);
    }
  }



  async moveQuestion(question: any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      console.log(question)
      const current = await queryRunner.manager.withRepository(this.questionRp).findOne({where:{id: question.question}, relations:{question:true}})
      console.log(current)

        if (current.order < question.newOrder) {
          //-1
          const propertiesElements = await queryRunner.manager.withRepository(this.questionRp).find({ where: { order: Between(current.order + 1, question.newOrder), question:{id:current.question.id} } })
          console.log(propertiesElements)
          propertiesElements.map(async (question) => {
            await queryRunner.manager.withRepository(this.questionRp).update({ id: question.id }, { order: question.order - 1 })
          })
          await queryRunner.manager.withRepository(this.questionRp).update({ id: current.id }, { order: question.newOrder })
        }
        else if (current.order > question.newOrder) {
          const propertiesElements = await queryRunner.manager.withRepository(this.questionRp).find({ where: { order: Between(question.newOrder, current.order - 1), question:{id:current.question.id} }})
          console.log(propertiesElements)
          propertiesElements.map(async (question) => {
            await queryRunner.manager.withRepository(this.questionRp).update({ id: question.id }, { order: question.order + 1 })
          })
          await queryRunner.manager.withRepository(this.questionRp).update({ id: current.id }, { order: question.newOrder })
          //+1
        }
        await queryRunner.commitTransaction()
    
    } catch (err) {
      console.log(err)
        await queryRunner.rollbackTransaction()
        ExceptionErrorMessage(err);
    } finally {
        await queryRunner.release()
    }
  }


  //Actualizar Question
  async updateQuestion(id: number, question: any) {
    try {
      await this.questionRp.update(id, question);
      return await this.questionRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Obtener Question
  async findQuestionById(id: number) {
    try {
      return await this.questionRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }


  //Listar Question
  async findAllQuestion() {
    try {
      return await this.questionRp.find();
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Borrar Question
  async deleteQuestion(id: any) {
    const exist = await this.questionRp.findOne({where:{id: id}, relations:{question:true}})
    
    if(!exist)
      return exist
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const current = await queryRunner.manager.withRepository(this.questionRp).findOneBy({ id: id })

      const propertiesElements = await queryRunner.manager.withRepository(this.questionRp).find({ where: { order: MoreThan(current.order), question:{ id:exist.question.id}  } })
      propertiesElements.map(async (question) => {
        await queryRunner.manager.withRepository(this.questionRp).update({ id: question.id }, { order: question.order - 1 })
      })
      await queryRunner.manager.withRepository(this.questionRp).delete({ id: id })
      
      await queryRunner.commitTransaction()
      return { message: "El registro seleccionado ha sido eliminado" };
    } catch (err) {
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err);
  } finally {
      await queryRunner.release()
  }
  }
}
