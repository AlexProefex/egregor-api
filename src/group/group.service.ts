import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(GroupEntity)
  private readonly groupRp: Repository<GroupEntity>) {
  }



}