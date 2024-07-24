import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { ElementEntity } from 'src/database/entity/element/element-entity';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { SectionEntity } from 'src/database/entity/section/section-entity';
import { UnitEntity } from 'src/database/entity/unit/unit-entity';
import { TypeExam, TypePractice } from 'src/util/constants';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity) private readonly unitRp: Repository<UnitEntity>,
  @InjectRepository(SectionEntity) private readonly sectionRp: Repository<SectionEntity>,
  @InjectRepository(ElementEntity) private readonly elementRp: Repository<ElementEntity>,
  @InjectRepository(QuizEntity) private readonly quiztRp: Repository<QuizEntity>,


    private datasource: DataSource) {
  }

  //Guardar Unit
  async saveUnit(unit: any) {
    try {
      return await this.unitRp.save(unit);
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Actualizar Unit
  async updateUnit(id: number, unit: any) {
    try {
      await this.unitRp.update(id, unit);
      return await this.unitRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Obtener Unit
  async findUnitById(id: number) {
    try {
      return await this.unitRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }


  //Listar Unit
  async findAllUnit() {
    try {
      return await this.unitRp.find();
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Borrar Unit
  async deleteUnit(id: any) {

    const exams = await this.getExams(id)
    const practics = await this.getPractice(id)
    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      exams.forEach(async (exam)=>{
         await queryRunner.manager.withRepository(this.quiztRp).delete({ id: exam.idReference})
      })

      practics.forEach(async (exam)=>{
        await queryRunner.manager.withRepository(this.quiztRp).delete({ id: exam.idReference})
     })
      await queryRunner.manager.withRepository(this.unitRp).delete({ id: id })
      await queryRunner.commitTransaction()
      return { message: "El registro seleccionado ha sido eliminado" };
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
      ExceptionErrorMessage(err);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
    }
    
  }

  private async getExams(id){
    return await this.datasource.createQueryBuilder()
    .select('section.idReference', 'idReference')
    .from(UnitEntity, 'unit')
    .innerJoin(SectionEntity,"section","section.unitId = unit.id")
    .where(`"section"."type" = '${TypeExam}'`)
    .andWhere(`"unit"."id" = '${id}'`)
    .getRawMany()
  }
  private async getPractice(id){
    return await this.datasource.createQueryBuilder()
    .select('element.idReference', 'idReference')
    .from(UnitEntity, 'unit')
    .innerJoin(SectionEntity,"section","section.unitId = unit.id")
    .innerJoin(ElementEntity,"element","element.sectionId = section.id")
    .where(`"element"."type" = '${TypePractice}'`)
    .andWhere(`"unit"."id" = '${id}'`)
    .getRawMany()
  }
}
