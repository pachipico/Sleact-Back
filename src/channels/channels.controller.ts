import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';
import { ChannelsService } from './channels.service';

@UseInterceptors(UndefinedToNull)
@ApiTags('CHANNEL')
@Controller('api/workspaces/:workspace/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  getAllChannels() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':name/chats')
  getChats() {}

  @Get(':name/members')
  getAllMembers() {}

  @Post()
  createChannel() {}

  @Post(':name/chats')
  saveChat() {}

  @Post(':name/members')
  inviteMember() {}
}
