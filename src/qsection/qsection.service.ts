import { Injectable } from '@nestjs/common';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { QsectionEntity } from 'src/database/entity/qsection/qsection-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QsectionService {
  constructor(@InjectRepository(QsectionEntity)
  private readonly qsectionRp:Repository<QsectionEntity>){}

  async saveQSection(model:any){
    try {
      await this.qsectionRp.save(model);
    } catch (error) {
      console.log(error)
        ExceptionErrorMessage(error);            
    }
  }


  async updateQSection(id:number, model:any){
    try {
        await this.qsectionRp.update(id,model);
        return await this.qsectionRp.findOneBy({id:id});
    } catch (error) {
        ExceptionErrorMessage(error);            
    }
  }

  async deleteQSection(id:any){
    try {
        await this.qsectionRp.delete({id:id})
        return { message:"El registro seleccionado ha sido eliminado" };
    }
    catch(error){
        ExceptionErrorMessage(error);            
    }
  }

}
