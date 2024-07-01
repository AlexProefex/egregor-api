import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from './entity/user-entity/user-entity';


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
        entities: [UserEntity],
        synchronize: true,
        dropSchema: true,
        }),
    ],
    //providers:[IsUniqueConstraints,IsNumberConstraints]

})
export class DatabaseModule {
    constructor (private readonly Connection:Connection){
    }
}