import { Controller, Post, Body, Param, Put, Get} from '@nestjs/common';
import { GroupService } from './group.service';
import { Public } from 'src/auth/auth.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupValidation } from 'src/database/validation/group-validation';
import { ParameterValidation } from 'src/database/validation/parameter-validation';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

    @Public()
    @Get()
    @ApiOperation({ summary: 'Lista todos los grupos un nuevo grupo'})
    getGroup():any{
        return this.groupService.getGroups();
    }


    @Public()
    @Post()
    @ApiOperation({ summary: 'Almacena un nuevo grupo'})
    saveGroup(@Body() model:GroupValidation):any{
        return this.groupService.saveGroup(model);
    }

    @Public()
    @Put("/disabled/:id")
    @ApiOperation({ summary: 'Deshabilita el grupo'})
    disabledGroup(@Param() params:ParameterValidation):any{
      return this.groupService.disableGroup(params.id);
    }

    @Public()
    @Put(":id")
    @ApiOperation({ summary: 'Actualiza un grupo y sus horarios'})
    updateGroup(@Body() model:GroupValidation, @Param() params:ParameterValidation):any{
      return this.groupService.updateGroup(model,params.id);
    }

    @Public()
    @Post()
    @ApiOperation({ summary: 'Agrega un estudiante al grupo'})
    addStundetToGroup(@Body() model:GroupValidation, @Param() params:ParameterValidation):any{
      return this.groupService.updateGroup(model,params.id);
    }

}


