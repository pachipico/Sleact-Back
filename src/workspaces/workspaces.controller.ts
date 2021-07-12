import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

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
