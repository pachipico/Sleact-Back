import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';
import { WorkspacesService } from './workspaces.service';

@UseInterceptors(UndefinedToNull)
@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get()
  getMyWorkspaces() {}

  @Post()
  createWorkspace() {}

  @Get(':url/members')
  getAllMembersFromWorkspace(@Query('url') url) {}

  @Post(':url/members')
  inviteMembersToWorkspace(@Query('url') url) {}

  @Get(':url/members/:id')
  getMemberInfoInWorkspace(@Query() query) {}

  @Delete()
  kickMemberFromWorkspace() {}
}
