import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { token } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { StorageService } from 'src/storage/storage.service';
import { DirectionEntity } from 'src/database/entity/direction/direction';
import { BankEntity } from 'src/database/entity/bank/bank';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import { GroupEntity } from 'src/database/entity/group/group-entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,DirectionEntity, BankEntity, LicenseEntity, GroupEntity])],
  controllers: [UserController],
  providers: [UserService, token, JwtService, StorageService],
  exports: [UserService, token]
})
export class UsersModule {}
