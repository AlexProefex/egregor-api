import { Controller, Post, Body } from '@nestjs/common';
import { SetdataService } from './setdata.service';
import { Public } from 'src/auth/auth.controller';


@Controller('setdata')
export class SetdataController {
  constructor(private readonly setdataService: SetdataService) {}

  @Post()
  @Public()
  async create(@Body() createSetdatumDto: any) {
     await this.setdataService.setDataAll();
  }

}
