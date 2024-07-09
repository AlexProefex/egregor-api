import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementEntity } from 'src/database/entity/element/element-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Repository } from 'typeorm';

@Injectable()
export class ElementService {
  constructor(@InjectRepository(ElementEntity)
  private readonly elementRp:Repository<ElementEntity>){
}

//Guardar Element
async saveElement(element:any){
  try {
      return await this.elementRp.save(element);
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Actualizar Element
async updateElement(id:number, element:any){
  try {
      await this.elementRp.update(id,element);
      return await this.elementRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Obtener Element
async findByIdElement(id:number){
  try {
      return await this.elementRp.findOneBy({id:id});
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}


//Listar Element
async findAllElement(){
  try {
      return await this.elementRp.find();
  } catch (error) {
      ExceptionErrorMessage(error);            
  }
}

//Borrar Element
async deleteElement(id:any){
  try {
      await this.elementRp.delete({id:id})
      return { message:"El registro seleccionado ha sido eliminado" };
  }
  catch(error){
      ExceptionErrorMessage(error);            
  }
}
}
