
import { IsNotEmpty, IsNumber  } from 'class-validator';
import { MessaeSendResponseIsNotEmpty, MessaeSendResponseIsNumber } from 'src/validation/validation.exception';
import { ApiProperty } from '@nestjs/swagger/dist';


export class QuestionPracticeValidationOMultiple {
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    option:string;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:number;

    order:string;
}

export class QuestionPracticeValidationCheckBox {
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    option:string;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:number;

    order:string;
}



export class QuestionPracticeValidationDropDown {
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    option:string;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:number;

    order:string;
}



export class QuestionPracticeValidationShortAnswer {
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:number;

    order:string;
}

export class QuestionPracticeValidationText {
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    order:string;

}

export class QuestionPracticeValidationImage {
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La imagen')})
    image:string;

    url:string;

    order:string;


}


export class QuestionPracticeValidationMovie {
    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Embed')})
    embed:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    order:string;

}


export class QuestionPracticeValidationUpdateOMultiple {

    id:number;

    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    option:string;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:string;
    
}

export class QuestionPracticeValidationUpdateCheckBox {
    
    id:number;

    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    option:string;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:string;

    
}



export class QuestionPracticeValidationUpdateDropDown {
    
    id:number;

    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Nivel')})
    option:string;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:string;
}



export class QuestionPracticeValidationUpdateShortAnswer {
    
    id:number;

    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Las respuestas')})
    answer:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('Los puntos')})
    @IsNumber({},{message: MessaeSendResponseIsNumber('Los puntos')})
    points:string;
}

export class QuestionPracticeValidationUpdateText {
    
    id:number;

    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

}

export class QuestionPracticeValidationUpdateImage {
    
    id:number;

    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La imagen')})
    image:string;

    url:string;


}


export class QuestionPracticeValidationUpdateMovie {
    
    id:number;

    type:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El titulo')})
    title:string;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La  descripcion')})
    description:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El Embed')})
    embed:string;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

}


export class QuestionValidateOrder {
    
    id:number;

    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('El orden actual')})
    newOrder:number;

    order:number;
    
    @ApiProperty()
    @IsNotEmpty({message: MessaeSendResponseIsNotEmpty('La seccion')})
    @IsNumber({}, { message:MessaeSendResponseIsNumber('La seccion')})
    question:number;

}










