import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from 'src/database/entity/user/user-entity';
import { randomText } from 'src/util/custom';
import { ExceptionErrorMessage } from 'src/validation/exception-error';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CodeEntity } from 'src/database/entity/code/code-entity';

@Injectable()
export class CodeService {
  constructor(@InjectRepository(CodeEntity)
  private readonly codeRp: Repository<CodeEntity>,
  @InjectRepository(UserEntity) private readonly userRp: Repository<UserEntity>,
  private readonly mailerService: MailerService
  ) {}

  //Guardar Code
  async saveCode(code: any) {
    try {
      const user = await this.userRp.findOneBy({email:code.email})
      if(user){
        const exist = await this.codeRp.findOneBy({email:code.email})
        if(exist){
          await this.codeRp.delete({email:code.email})
        }
        const securityCode = randomText()
        await this.mailerService.sendMail({
          to: 'apalli@proefexperu.com',
          from: '"Welcome to the fold" <linux@over.windows>', // sender address
          subject: 'Quotes', // Subject line
          text: `Su codigo de verificacion es ${securityCode}`, // plaintext body
        });
        code.userId = user.id
        code.securityCode = securityCode
        await this.codeRp.save(code);
      }
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }


  async validateCode(code: any) {
    try {
      const user = await this.userRp.findOneBy({email:code.email})
      if(user){
        const exist = await this.codeRp.findOneBy({email:code.email})
        if(exist){
          if(exist.securityCode==code.securityCode){
            await this.codeRp.delete({email:code.email})
            return true;
          }
         
        }
       
      }
      return false;
    } catch (error) {
      ExceptionErrorMessage(error);
    }
  }


  async updatePassword(user: any) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await this.userRp.update(user.email, { password:user.password });
    } catch (error) {
        ExceptionErrorMessage(error);
    }
  }

}
