import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsUniqueConstraintsInput } from "./is-unique";
import { EntityManager } from "typeorm";

@ValidatorConstraint({async:true,name:'ValidateInterfaceUnique'})
@Injectable()
export class IsUniqueConstraints implements ValidatorConstraintInterface{

    constructor(private readonly entintyManager:EntityManager){}

    async validate(value: string, validationArguments?: ValidationArguments):Promise<boolean> {
        const {tableName, column}: IsUniqueConstraintsInput = validationArguments.constraints[0];
        const {... validationProperty} = validationArguments.object
        let exist
        if(validationProperty['id']){
            const currentRow = await this.entintyManager
            .getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({[column]:value}) 
            .getOne();
            
            if(currentRow){
                exist = currentRow.id == validationProperty['id'] ? false : true; 
            }else{
                exist = false;
            }
            
        }
        else{
            exist = await this.entintyManager
            .getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({[column]:value}) 
            .getExists();
        }

        return exist ? false : true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const conditionals = {
          //  name:'nombre',
            email:'correo',
          //  slug:'slug',
        }

        const {tableName, column}: IsUniqueConstraintsInput = validationArguments.constraints[0];

        return `El ${conditionals[column]} : $value ya existe`;
    }
}