import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user-entity/user-entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';



@Module({
    imports:[
      ConfigModule.forRoot(),
      TypeOrmModule.forFeature([
        UserEntity
      ]),
      PassportModule,
      JwtModule.register({
        secret:process.env.JWT_SECRET_KEY,
        signOptions:{expiresIn:'24h'}
      }),
      ],
    controllers:[AuthController],
    providers: [AuthService,LocalStrategy,JwtStrategy,{ provide: APP_GUARD,useClass: JwtAuthGuard}]
  })


export class AuthModule {}

