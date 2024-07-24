import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { CodeEntity } from 'src/database/entity/code/code-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/database/entity/user/user-entity';

@Module({
  imports:[TypeOrmModule.forFeature([CodeEntity,UserEntity]),MailerModule.forRoot({
    transport: {
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
  }),],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}

