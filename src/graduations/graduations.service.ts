import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraduationsEntity } from 'src/database/entity/graduations/graduations';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GraduationsService {
  constructor(
    @InjectRepository(GraduationsEntity) private readonly graduationsRp: Repository<GraduationsEntity>,
    @InjectRepository(UserEntity) private readonly userRp: Repository<UserEntity>,

    private datasource: DataSource,
  ) {
  }
  async getGraduations() {
    const response = await this.datasource.createQueryBuilder()
    .select('user.id','id')
    .addSelect(`CONCAT("user"."name",' ',"user"."lastName") AS name`)
    .from(UserEntity,'user')
    .innerJoin(GraduationsEntity,"graduations","graduations.studentId = user.id")
    .innerJoin(GroupEntity,"group","group.id = graduations.groupId")
    .getRawMany()
    return response
  }

  findAll() {
    return `This action returns all graduations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} graduation`;
  }

  update(id: number, updateGraduationDto: any) {
    return `This action updates a #${id} graduation`;
  }

  remove(id: number) {
    return `This action removes a #${id} graduation`;
  }
}
