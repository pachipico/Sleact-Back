import { Controller, Get, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';

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
