import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementEntity } from 'src/database/entity/element/element-entity';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { TypePractice } from 'src/util/constants';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(ElementEntity) private readonly elementRp: Repository<ElementEntity>,
    @InjectRepository(QuizEntity) private readonly quizRp: Repository<QuizEntity>,
    private datasource: DataSource) {
  }

  //Guardar Element
  async saveElement(element: any) {
    try {
      await this.elementRp.save(element);
    } catch (error) {
      console.log(error)
      ExceptionErrorMessage(error);
    }
  }


  async savePractice(element: any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const quiz = await queryRunner.manager.withRepository(this.quizRp).save(element)
      element.idReference = quiz.id;
      await queryRunner.manager.withRepository(this.elementRp).save(element)
      console.log(element)
      await queryRunner.commitTransaction()

    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
  //Actualizar Element
  async updateElement(id: number, element: any) {
    try {
      await this.elementRp.update(id, element);
      return await this.elementRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  async updatePractice(id: number, element: any) {
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const currentElement = await queryRunner.manager.withRepository(this.elementRp).findOneBy({ id: id })
      await queryRunner.manager.withRepository(this.quizRp).update({ id: currentElement.idReference }, { name: element.name, time: element.time })
      element.idReference = currentElement.idReference
      await queryRunner.manager.withRepository(this.elementRp).update({ id: id }, element)
      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  //Obtener Element
  async findByIdElement(id: number) {
    try {
      return await this.elementRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }


  //Listar Element
  async findAllElement() {
    try {
      return await this.elementRp.find();
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Borrar Element
  async deleteElement(id: any) {
    const exist = await this.elementRp.findOneBy({id:id});
    if(!exist)
      return exist
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      const element = await queryRunner.manager.withRepository(this.elementRp).findOneBy({ id: id })
      if (element.type == TypePractice) {
        await queryRunner.manager.withRepository(this.quizRp).delete({ id: element.idReference })
      }
      await queryRunner.manager.withRepository(this.elementRp).delete({ id: id })
      await queryRunner.commitTransaction()
      return { message: "El registro seleccionado ha sido eliminado" };
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
  }
}
