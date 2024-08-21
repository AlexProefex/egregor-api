import { Controller, Post, Body, Param, Put, Get,Delete} from '@nestjs/common';
import { GroupService } from './group.service';
import { Public } from 'src/auth/auth.controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CloseGroupValidation, GroupValidationAddStudent, GroupValidationChangeStudent, OpenGroupValidation } from 'src/database/validation/group-validation';
import { ParameterValidation } from 'src/database/validation/parameter-validation';
import { TypesGroupClose, TypesGroupOpen } from 'src/util/constants';

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
    @Get('camps/:id')
    @ApiOperation({ summary: 'Obtiene los campos para actualizar un grupo'})
    getGroupUpdate(@Param() param:ParameterValidation):any{
        return this.groupService.getGroupsByID(param.id);
    }



    @Public()
    @Post('open')
    @ApiOperation({ summary: 'Almacena grupo abierto'})
    saveGroupOpen(@Body() model:OpenGroupValidation):any{
      model.type = TypesGroupOpen
      return this.groupService.saveGroupOpen(model);
    }

    @Public()
    @Post('close')
    @ApiOperation({ summary: 'Almacena un grupo cerrado'})
    saveGroupClose(@Body() model:CloseGroupValidation):any{
      model.type = TypesGroupClose
      return this.groupService.saveGroupClose(model);
    }

    @Public()
    @Put("/disabled/:id")
    @ApiOperation({ summary: 'Deshabilita el grupo'})
    disabledGroup(@Param() params:ParameterValidation):any{
      return this.groupService.disableGroup(params.id);
    }

    @Public()
    @Put("open/:id")
    @ApiOperation({ summary: 'Actualiza un grupo abierto y sus horarios'})
    updateOpenGroup(@Body() model:OpenGroupValidation, @Param() params:ParameterValidation):any{
      return this.groupService.updateGroupOpen(model,params.id);
    }

    @Public()
    @Put("close/:id")
    @ApiOperation({ summary: 'Actualiza un grupo cerrado y sus horarios'})
    updateCloseGroup(@Body() model:OpenGroupValidation, @Param() params:ParameterValidation):any{
      return this.groupService.updateGroupClose(model,params.id);
    }

    @Public()
    @Post('student')
    @ApiOperation({ summary: 'Agrega un estudiante al grupo'})
    addStundetToGroup(@Body() model:GroupValidationAddStudent):any{
      return this.groupService.addUstudentToGroup(model);
    }

    @Public()
    @Get('student/:id')
    @ApiOperation({ summary: 'Lista todos los estudiantes del grupo'})
    getStudentsByGroup(@Param() params:ParameterValidation):any{
        return this.groupService.getStudentsOnGroup(params.id);
    }

    @Public()
    @Post('change')
    @ApiOperation({ summary: 'Cambiar a un estudiante de grupo'})
    changeGroup(@Body() model:GroupValidationChangeStudent):any{
        return this.groupService.changeGroupStudent(model);
    }

    @Public()
    @Post('detail/:id')
    @ApiOperation({ summary: 'Obtiene los detalles de un grupo'})
    detailGroup(@Param() params:ParameterValidation):any{
        return this.groupService.detailGroupById(params.id);
    }

    @Public()
    @Delete('remove/student/:id')
    @ApiOperation({ summary: 'Elimina al estudiante de un grupo'})
    deleteStudentGroup(@Body() model:GroupValidationChangeStudent):any{
        return this.groupService.deleteStudentGroup(model);
    }


    @Public()
    @Delete('remove/:id')
    @ApiOperation({ summary: 'Elimina al estudiante de un grupo'})
    deleteGroup(@Body() param:ParameterValidation):any{
        return this.groupService.deleteGroup(param.id);
    }
}


