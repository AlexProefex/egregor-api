import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notEqual } from 'assert';
import { QuestionEntity } from 'src/database/entity/question/question-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Between, DataSource, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';


@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionEntity)
  private readonly questionRp: Repository<QuestionEntity>,
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
  async saveQuestion(question: any) {
    try {
      const position = await this.questionRp.count({ where: { question: question.question } })
      question.order = position + 1
      return await this.questionRp.save(question);
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }



  async moveQuestion(question: any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {

        const current = await queryRunner.manager.withRepository(this.questionRp).findOneBy({ id: question.id })

        if (current.order < question.newOrder) {
          //-1
          const propertiesElements = await queryRunner.manager.withRepository(this.questionRp).find({ where: { order: Between(current.order + 1, question.newOrder), question: question.question } })
          propertiesElements.map(async (question) => {
            await queryRunner.manager.withRepository(this.questionRp).update({ id: question.id }, { order: question.order - 1 })
          })
          await queryRunner.manager.withRepository(this.questionRp).update({ id: current.id }, { order: question.newOrder })
        }
        else if (current.order > question.newOrder) {
          const propertiesElements = await queryRunner.manager.withRepository(this.questionRp).find({ where: { order: Between(question.newOrder, current.order - 1), question: question.question } })
          propertiesElements.map(async (question) => {
            await queryRunner.manager.withRepository(this.questionRp).update({ id: question.id }, { order: question.order + 1 })
          })
          await queryRunner.manager.withRepository(this.questionRp).update({ id: current.id }, { order: question.newOrder })
          //+1
        }
        await queryRunner.commitTransaction()
    
    } catch (err) {
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
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const current = await queryRunner.manager.withRepository(this.questionRp).findOneBy({ id: id })

      const propertiesElements = await queryRunner.manager.withRepository(this.questionRp).find({ where: { order: MoreThan(current.order) } })
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
