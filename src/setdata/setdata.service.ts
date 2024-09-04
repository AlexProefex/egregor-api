import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankEntity } from 'src/database/entity/bank/bank';
import { DirectionEntity } from 'src/database/entity/direction/direction';
import { GroupEntity } from 'src/database/entity/group/group-entity';
import { LevelEntity } from 'src/database/entity/level/level-entity';
import { LicenseEntity } from 'src/database/entity/license/license-entity';
import { UserEntity } from 'src/database/entity/user/user-entity';
import { GroupService } from 'src/group/group.service';
import { LevelService } from 'src/level/level.service';
import { LicenseService } from 'src/license/license.service';
import { UserService } from 'src/users/users.service';
import { StatusCreateLicense, TypeB2B, TypeB2B2C, TypeB2C, TypeCompany, TypesGroupClose, TypesGroupOpen, TypeStudent, TypeTeacher } from 'src/util/constants';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SetdataService {
  constructor(
    @InjectRepository(LevelEntity) private readonly levelRp: Repository<LevelEntity>,
    private readonly levelService: LevelService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly licenseService: LicenseService,

    private datasource: DataSource,


) {
}
 
async setDataAll(){
  

  const level = await this.levelService.saveLevel({
    "name": "prueba",
    "color": "#ff00ff"
  })
//1
  const company = await this.userService.saveUserGeneral({
    "company_name": "laive",
    "representative": "manuel gomez",
    "comercial_brand": "laive EIRL",
    "business_name": "laive",
    "country": "peru",
    "fiscal_rcf": "4565421212",
    "email": "empresa@gmail.com",
    "password": "123456789",
    "rol":TypeCompany
  })

  
//2
  const est1 = await this.userService.saveUserGeneral({
    "name": "nicol",
    "lastName": "pinto",
    "email": "alumno@gmail.com",
    "password": "123456789",
    "type_student": TypeB2B,
    "company": 1,
    "country": "mexico",
    "curp": "2000",
    "rol":TypeStudent
  })
//3
  const est2 = await this.userService.saveUserGeneral({
    "name": "alexandra",
    "lastName": "pinto",
    "email": "alep@gmail.com",
    "password": "123456789",
    "type_student": TypeB2B,
    "company": 1,
    "country": "mexico",
    "curp": "2000",
    "rol":TypeStudent

  })

  const estopen = await this.userService.saveUserGeneral({
    "name": "mishell",
    "lastName": "torres",
    "email": "mtorres@gmail.com",
    "password": "123456789",
    "type_student": TypeB2C,
    "company": 0,
    "country": "mexico",
    "curp": "9999",
    "rol":TypeStudent
  })

  const teacher = await this.userService.saveUserTeacher({
    "name": "profesor",
    "lastName": "egregor",
    "email": "profesor@gmail.com",
    "password": "123465789",
    "type_contract": "",
    "tariff": 54656545,
    "carnet_id": "456654564564",
    "bank": {
      "bank_name": "456465465",
      "swift_code": "1515212132",
      "bank_account": "5454213397",
      "bank_address": "9874512154"
    },
    "direction": {
      "street": "Direction",
      "ext_number": "f50",
      "int_number": "500",
      "neighborhood": "casa",
      "country": "mexico",
      "state": "tihuana",
      "postal_code": "205"
    },
    "rol":TypeTeacher
  })

  const head = await this.userService.saveUserGeneral({
    "name":"nombre",
    "lastName":"apellido",
    "email":"headteacher@gmail.com",
    "password":"123456789",
    "type_contract":"tipocontrato",
    "tariff":100,
    "carnet":"carnet",
    "type_student":"b2c",
    "curp":"curp",
    "phone":"phone",
    "description":"description",
    "rol":"head teacher",
    "image":"undefined"
})

const editor = await this.userService.saveUserGeneral({
  "name":"nombre",
  "lastName":"apellido",
  "email":"editor@gmail.com",
  "password":"123456789",
  "type_contract":"tipocontrato",
  "tariff":100,
  "carnet":"carnet",
  "type_student":"b2c",
  "curp":"curp",
  "phone":"phone",
  "description":"description",
  "rol":"editor de contenido",
  "image":"undefined"
})

const rh = await this.userService.saveUserGeneral({
  "name":"nombre",
  "lastName":"apellido",
  "email":"recursoshumanos@gmail.com",
  "password":"123456789",
  "type_contract":"tipocontrato",
  "tariff":100,
  "carnet":"carnet",
  "type_student":"b2c",
  "curp":"curp",
  "phone":"phone",
  "description":"description",
  "rol":"recursos humanos",
  "image":"undefined"
})

const qa = await this.userService.saveUserGeneral({
  "name":"nombre",
  "lastName":"apellido",
  "email":"qa@gmail.com",
  "password":"123456789",
  "type_contract":"tipocontrato",
  "tariff":100,
  "carnet":"carnet",
  "type_student":"b2c",
  "curp":"curp",
  "phone":"phone",
  "description":"description",
  "rol":"qa",
  "image":"undefined"
})

const admin = await this.userService.saveUserGeneral({
  "name":"nombre",
  "lastName":"apellido",
  "email":"admin@gmail.com",
  "password":"123456789",
  "type_contract":"tipocontrato",
  "tariff":100,
  "carnet":"carnet",
  "type_student":"b2c",
  "curp":"curp",
  "phone":"phone",
  "description":"description",
  "rol":"qa",
  "image":"undefined"
})


  const groupOpen = await this.groupService.saveGroupOpen({
    "group_number": "01",
    "status": "acive",
    "level": 1,
    "teacher": 5,
    "duration": 100,
    "schedule": [
      {"day":1,"start_time":"10:00","end_time":"20:00"},
      {"day":2,"start_time":"10:00","end_time":"20:00"},
    ],
    "type":TypesGroupOpen
  })

  const groupClose = await this.groupService.saveGroupClose({
    "company": 1,
    "start_time": "2024-08-26T19:11:09.506Z",
    "end_time": "2024-10-26T19:11:09.506Z",
    "group_number": "05",
    "status": "active",
    "level": 1,
    "teacher": 5,
    "schedule": [
      {"day":3,"start_time":"10:00","end_time":"20:00"},
      {"day":4,"start_time":"10:00","end_time":"20:00"},
    ],
    "type":TypesGroupClose
  })


  
  const licencias = await this.licenseService.saveLicenseCompany({
    "duration": 12,
    "count": 5,
    "company": 1,
    "type" : TypeCompany,
    "status" : StatusCreateLicense
  })


/*  const asing = await this.licenseService.assingLicenseToStudent({
      "id": 1,
      "duration": 6,
      "student": 2
  })


  const asing2 = await this.licenseService.assingLicenseToStudent({
    "id": 2,
    "duration": 6,
    "student": 3
  })

*/



}
}
