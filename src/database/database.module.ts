import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from './entity/user/user-entity';
import { UnitEntity } from './entity/unit/unit-entity';
import { SectionEntity } from './entity/section/section-entity';
import { QuestionEntity } from './entity/question/question-entity';
import { LevelEntity } from './entity/level/level-entity';
import { ElementEntity } from './entity/element/element-entity';
import { QuizEntity } from './entity/quiz/quiz-entity';
import { QsectionEntity } from './entity/qsection/qsection-entity';
import { CodeEntity } from './entity/code/code-entity';
import { IsUniqueConstraints } from 'src/validation/is-unique-constraints';
import { LicenseEntity } from './entity/license/license-entity';
import { GroupEntity } from './entity/group/group-entity';
import { ScheduleEntity } from './entity/schedule/schedule-entity';
import { BankEntity } from './entity/bank/bank';
import { DirectionEntity } from './entity/direction/direction';
import { AssistanceEntity } from './entity/assistance/assistance';
import { ClassesEntity } from './entity/classes/classes';
import { GradesEntity } from './entity/grades/grades';
import { GraduationsEntity } from './entity/graduations/graduations';
import { ScoresEntity } from './entity/scores/scores';

//
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
        entities: [UserEntity,
            UnitEntity,
            SectionEntity, 
            QuestionEntity, 
            LevelEntity, 
            ElementEntity, 
            QuizEntity,
            QsectionEntity, 
            CodeEntity, 
            LicenseEntity, 
            GroupEntity, 
            ScheduleEntity, 
            BankEntity, 
            DirectionEntity,
            AssistanceEntity,
            ClassesEntity,
            GradesEntity,
            GraduationsEntity,
            ScoresEntity
         ],
        synchronize: true,
        dropSchema: false,
        }),
    ],
    providers:[IsUniqueConstraints]

})
export class DatabaseModule {
    constructor (private readonly Connection:Connection){
    }
}