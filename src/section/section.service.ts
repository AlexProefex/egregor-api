import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from 'src/database/entity/quiz/quiz-entity';
import { SectionEntity } from 'src/database/entity/section/section-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class SectionService {
  constructor(
  @InjectRepository(SectionEntity) private readonly sectionRp:Repository<SectionEntity>,
  @InjectRepository(QuizEntity) private readonly quizRp:Repository<QuizEntity>,
  private datasource:DataSource
){
}

//Guardar Section
async saveSection(section:any){
  try {
      return await this.sectionRp.save(section);
  } catch (error) {
      console.log(error)
      ExceptionErrorMessage(error);            
  }
}

//Guardar Section
async saveExam(section:any){
  const queryRunner = this.datasource.createQueryRunner()
  await queryRunner.startTransaction()
  try {
      // execute some operations on this transaction:
      const quiz = await queryRunner.manager.withRepository(this.quizRp).save(section)
      section.idReference = quiz.id;
      await queryRunner.manager.withRepository(this.sectionRp).save(section)
      // commit transaction now:
      await queryRunner.commitTransaction()
  } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction()
  } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release()
  }
   
}

async updateExam(id:number, section:any){
  const queryRunner = this.datasource.createQueryRunner()
  await queryRunner.startTransaction()
  try {
      const currentElement = await queryRunner.manager.withRepository(this.sectionRp).findOneBy({id:id})
      await queryRunner.manager.withRepository(this.quizRp).update({id:currentElement.idReference},{name:section.name,time:section.time})
      section.idReference = currentElement.idReference
      await queryRunner.manager.withRepository(this.sectionRp).update({id:id},section)
      await queryRunner.commitTransaction()
  } catch (err) {
      await queryRunner.rollbackTransaction()
  } finally {
      await queryRunner.release()
  }
}

//Actualizar Section
async updateSection(id:number, section:any){
  try {
      await this.sectionRp.update(id,section);
      return await this.sectionRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Obtener Section
async findById(id:number){
  try {
      return await this.sectionRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}


//Listar Section
async findAllSection(){
  try {
      return await this.sectionRp.find();
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Borrar Section
async deleteSection(id:any){
  try {
      await this.sectionRp.delete({id:id})
      return { message:"El registro seleccionado ha sido eliminado" };
  }
  catch(error){
      ExceptionErrorMessage(error);            
  }
}
}
