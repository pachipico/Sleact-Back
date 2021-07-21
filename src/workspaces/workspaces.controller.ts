import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { createWorkspaceDto } from './dto/create.Workspace.dto';
import { WorkspacesService } from './workspaces.service';

@UseInterceptors(UndefinedToNull)
@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workSpacesService: WorkspacesService) {}

  @Get()
  async getMyWorkspaces(@User() user: Users) {
    return this.workSpacesService.findMyWorkspaces(user.id);
  }

  @Post()
  async createWorkspace(@User() user: Users, @Body() body: createWorkspaceDto) {
    return this.workSpacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  async getAllMembersFromWorkspace(@Param('url') url: string) {
    return this.workSpacesService.getWorkspaceMembers(url);
  }

  @Post(':url/members')
  inviteMembersToWorkspace(@Param('url') url) {}

  @Get(':url/members/:id')
  async getMemberInfoInWorkspace(@Query() query) {
    return this.workSpacesService.findById(query.id);
  }

  @Delete()
  kickMemberFromWorkspace() {}
}
