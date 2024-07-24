import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LevelModule } from './level/level.module';
import { UnitModule } from './unit/unit.module';
import { SectionModule } from './section/section.module';
import { ElementModule } from './element/element.module';
import { QuestionModule } from './question/question.module';
import { CodeModule } from './code/code.module';
import { QsectionModule } from './qsection/qsection.module';
import { QuizModule } from './quiz/quiz.module';
import { EstadisticModule } from './estadistic/estadistic.module';
import { RolesGuard } from './middleware/roles.guard';
import { LicenseModule } from './license/license.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
  ThrottlerModule.forRoot([{
    ttl: 6000,
    limit: 6,
  }]),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),AuthModule, UsersModule, DatabaseModule, LevelModule, UnitModule, SectionModule, ElementModule, QuestionModule, CodeModule, QuizModule, QsectionModule, EstadisticModule, LicenseModule, StorageModule],
  controllers: [AppController],
  providers: [AppService, {
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  }/*,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },*/
  ,UsersModule],
})
export class AppModule {}
