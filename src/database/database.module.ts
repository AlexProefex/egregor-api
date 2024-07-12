import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from './entity/user-entity/user-entity';
import { UnitEntity } from './entity/unit/unit-entity';
import { SectionEntity } from './entity/section/section-entity';
import { QuestionEntity } from './entity/question/question-entity';
import { LevelEntity } from './entity/level/level-entity';
import { ElementEntity } from './entity/element/element-entity';
import { QuizEntity } from './entity/quiz/quiz-entity';
import { QsectionEntity } from './entity/qsection/qsection-entity';
import { CodeEntity } from './entity/code/code-entity';


@Module({
    imports: [ 
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) ,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWROD,
        database: process.env.DATABASE_NAME,
        entities: [UserEntity,UnitEntity, SectionEntity, QuestionEntity, LevelEntity, ElementEntity, QuizEntity,QsectionEntity, CodeEntity ],
        synchronize: true,
        dropSchema: false,
        }),
    ],
    //providers:[IsUniqueConstraints,IsNumberConstraints]

})
export class DatabaseModule {
    constructor (private readonly Connection:Connection){
    }
}