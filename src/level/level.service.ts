import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { UnitEntity } from 'src/database/entity/unit/unit-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Repository } from 'typeorm';


@Injectable()
export class LevelService {
  constructor(@InjectRepository(LevelEntity)
  private readonly lelvelRp: Repository<LevelEntity>) {
  }


    //Contar Level
    async getCountLevel() {
      try {
        return await this.lelvelRp.count();
      } catch (error) {
        ExceptionErrorMessage(error);
      }
    }


  //Guardar Level
  async saveLevel(level: any) {
    try {
      return await this.lelvelRp.save(level);
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Actualizar Level
  async updateLevel(id: number, level: any) {
    try {
      await this.lelvelRp.update(id, level);
      return await this.lelvelRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Obtener Level
  async findById(id: number) {
    try {
      return await this.lelvelRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Obtener Level
  async findLevel(id: number) {
    try {
       
      
      const result = await this.lelvelRp.find({
        relations: {
          unit:{
            section:{
              element:{
             
              }
            }
          }
        },
        select:{
          id:true,
          name:true,
          unit:{
            id:true,
            name:true,
            section:{
              id:true,
              name:true,
              time:true,
              type:true,
              element:{
                content:true,
                content_pdf:true,
                description:true,
                embed:true,
                id:true,
                imagen:true,
                title:true,
                type:true,
                type_icon:true,
                idReference:true
              }
            }
          }
        },
        where:{id:id}
      });


      return this.removeNUllValues(result)
      

    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }



  removeNUllValues(obj) {
    if (Array.isArray(obj)) { 
      return obj
          .map(v => (v && typeof v === 'object') ? this.removeNUllValues(v) : v)
          .filter(v => !(v == null)); 
    } else { 
      return Object.entries(obj)
          .map(([k, v]) => [k, v && typeof v === 'object' ? this.removeNUllValues(v) : v])
          .reduce((a, [k, v]) => (v == null ? a : (a[k]=v, a)), {});
    } 
  }


  //Listar Level
  async findAllLevel() {
    try {
      return await this.lelvelRp.find();
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Borrar Level
  async deleteLevel(id: any) {
    try {
      await this.lelvelRp.delete({ id: id })
      return { message: "El registro seleccionado ha sido eliminado" };
    }
    catch (error) {
      ExceptionErrorMessage(error);
    }
  }
}
