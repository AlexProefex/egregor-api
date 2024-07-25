import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(GroupEntity)
  private readonly groupRp: Repository<GroupEntity>) {
  }
    //Contar Level
    async getCountLevel() {
      try {
        return await this.groupRp.count();
      } catch (error) {
        ExceptionErrorMessage(error);
      }
    }


  //Guardar Level
  async saveLevel(level: any) {
    try {
      return await this.groupRp.save(level);
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Actualizar Level
  async updateLevel(id: number, level: any) {
    try {
      await this.groupRp.update(id, level);
      return await this.groupRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Obtener Level
  async findById(id: number) {
    try {
      return await this.groupRp.findOneBy({ id: id });
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Obtener Level
  async findLevel(id: number) {
    try {
       
      
      const result = await this.groupRp.find({
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
      return await this.groupRp.find();
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }

  //Borrar Level
  async deleteLevel(id: any) {
    try {
      await this.groupRp.delete({ id: id })
      return { message: "El registro seleccionado ha sido eliminado" };
    }
    catch (error) {
      ExceptionErrorMessage(error);
    }
  }
}