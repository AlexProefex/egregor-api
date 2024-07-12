import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitEntity } from 'src/database/entity/unit/unit-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(@InjectRepository(UnitEntity)
  private readonly unitRp:Repository<UnitEntity>){
}

//Guardar Unit
async saveUnit(unit:any){
  try {
      return await this.unitRp.save(unit);
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Actualizar Unit
async updateUnit(id:number, unit:any){
  try {
      await this.unitRp.update(id,unit);
      return await this.unitRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Obtener Unit
async findUnitById(id:number){
  try {
      return await this.unitRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}


//Listar Unit
async findAllUnit(){
  try {
      return await this.unitRp.find();
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Borrar Unit
async deleteUnit(id:any){
  try {
      await this.unitRp.delete({id:id})
      return { message:"El registro seleccionado ha sido eliminado" };
  }
  catch(error){
    console.log(error)
      ExceptionErrorMessage(error);            
  }
}
}
