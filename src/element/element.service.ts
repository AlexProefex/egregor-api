import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementEntity } from 'src/database/entity/element/element-entity';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { SectionEntity } from 'src/database/entity/section/section-entity';
import { UnitEntity } from 'src/database/entity/unit/unit-entity';
import { TypePractice } from 'src/util/constants';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(ElementEntity) private readonly elementRp: Repository<ElementEntity>,
    @InjectRepository(QuizEntity) private readonly quizRp: Repository<QuizEntity>,
    @InjectRepository(LevelEntity) private readonly levelRp: Repository<QuizEntity>,
    @InjectRepository(UnitEntity) private readonly unitRp: Repository<UnitEntity>,
    @InjectRepository(SectionEntity) private readonly sectionRp: Repository<SectionEntity>,
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
      console.log(quiz)
      element.idReference = quiz.id;
      const {id,...model}=element
      console.log(model)
      await queryRunner.manager.withRepository(this.elementRp).save(model)
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

  async findByIdElementV2(id: number) {
    try {

    return await this.datasource.createQueryBuilder()
    .select('element.id', 'id')
    .addSelect('element.content','content')
    .addSelect('element.content_pdf','content_pdf')
    .addSelect('element.description','description')
    .addSelect('element.embed','embed')
    .addSelect('element.idReference','idReference')
    .addSelect('element.name','name')
    .addSelect('element.time','time')
    .addSelect('element.title','title')
    .addSelect('element.type','type')
    .addSelect('element.type_icon','type_icon')
    .addSelect('element.url','url')

    .addSelect('section.id','section_id')
    .addSelect('section.idReference','section_idReference')
    .addSelect('section.name','section_name')
    .addSelect('section.time','section_time')
    .addSelect('section.type','section_type')

    .addSelect('unit.id','unit_id')
    .addSelect('unit.name','unit_name')

    .addSelect('level.id','level_id')
    .addSelect('level.name','level_name')
    .addSelect('level.color','level_color')



    .from(LevelEntity, 'level')
    .innerJoin(UnitEntity,"unit","unit.levelId = level.id")
    .innerJoin(SectionEntity,"section","section.unitId = unit.id")
    .innerJoin(ElementEntity,"element","element.sectionId = section.id")
    .where(`"element"."id" = '${id}'`)
    .getRawMany()

      

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
