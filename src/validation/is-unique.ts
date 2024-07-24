import { ValidationOptions, registerDecorator,ValidationArguments  } from "class-validator"
import { IsUniqueConstraints } from "./is-unique-constraints";

export type IsUniqueConstraintsInput = {
    tableName: string,
    column: string;
};

export function IsUnique(options:IsUniqueConstraintsInput, validationOptions?: ValidationOptions){
    return function (object:any, propertyName: string){
        registerDecorator({
            name:'is-unique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints:[options],
            validator:IsUniqueConstraints
        });
    };
}