import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/database/entity/question/question-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Repository } from 'typeorm';


@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionEntity)
  private readonly questionRp:Repository<QuestionEntity>){
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
async saveQuestion(question:any){
  try {
      return await this.questionRp.save(question);
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Actualizar Question
async updateQuestion(id:number, question:any){
  try {
      await this.questionRp.update(id,question);
      return await this.questionRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Obtener Question
async findQuestionById(id:number){
  try {
      return await this.questionRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}


//Listar Question
async findAllQuestion(){
  try {
      return await this.questionRp.find();
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Borrar Question
async deleteQuestion(id:any){
  try {
      await this.questionRp.delete({id:id})
      return { message:"El registro seleccionado ha sido eliminado" };
  }
  catch(error){
      ExceptionErrorMessage(error);            
  }
}
}
