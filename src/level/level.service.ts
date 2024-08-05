import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { removeNUllValues } from 'src/util/custom';
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
          color:true,
          unit:{
            id:true,
            name:true,
            section:{
              id:true,
              name:true,
              time:true,
              type:true,
              idReference:true,
              element:{
                content:true,
                content_pdf:true,
                description:true,
                embed:true,
                id:true,
                title:true,
                type:true,
                type_icon:true,
                idReference:true,
                name:true,
                url:true
              }
            }
          }
        },
        where:{id:id},
        order:{id:'ASC',unit:{id:'ASC',section:{type:'DESC', id:'ASC',element:{id:'ASC'}}}}
      });
      return removeNUllValues(result)
    } catch (error) {
      ExceptionErrorMessage(error);
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


}
