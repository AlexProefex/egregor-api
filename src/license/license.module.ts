import { Module } from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user/user-entity';

@Module({
  imports:[TypeOrmModule.forFeature([LicenseEntity,UserEntity])],
  controllers: [LicenseController],
  providers: [LicenseService],
})
export class LicenseModule {}
