import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import fs from 'fs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { fstat } from 'fs';
import multer from 'multer';
import path from 'path';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { ChannelsService } from './channels.service';
import { PostChatDto } from './dto/post-chat.dto';

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.log('uploads file not found, creating uploads file...');
  fs.mkdirSync('uploads');
}

@UseInterceptors(UndefinedToNull)
@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  async getAllChannels(@Param('url') url: string, @User() user: Users) {
    return this.channelsService.getWorkspaceChannels(url, user.id);
  }

  @Get(':name')
  async getSpecificChannel(
    @Param('name') name: string,
    @Param('url') url: string,
  ) {
    return this.channelsService.getWorkspaceChannel(url, name);
  }

  @ApiOperation({ summary: '워크스페이스 특정 채널 채팅 모두 가져오기' })
  @Get(':name/chats')
  async getWorkspaceChannelChats(
    @Param('url') url,
    @Param('name') name,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.channelsService.getWorkspaceChannelChats(
      url,
      name,
      perPage,
      page,
    );
  }
  @Get(':name/members')
  async getAllMembers(@Param('url') url: string, @Param('name') name: string) {
    return this.channelsService.getWorkspaceChannelMembers(url, name);
  }

  @Post()
  async createChannel(
    @Param('url') url: string,
    @Param('name') name: string,
    @User() user: Users,
  ) {
    return this.channelsService.createWorkspaceChannels(url, name, user.id);
  }

  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @Post(':name/images')
  postImages(
    @UploadedFiles() file: Express.Multer.File[],
    @Param('url') url: string,
    @Param('name') name: string,
    @User() user: Users,
  ) {
    return this.channelsService.createWorkspaceChannelImages(
      url,
      name,
      file,
      user.id,
    );
  }

  @ApiOperation({ summary: '워크스페이스 특정 채널 채팅 생성하기' })
  @Post(':name/chats')
  async createWorkspaceChannelChats(
    @Param('url') url,
    @Param('name') name,
    @Body('content') content,
    @User() user: Users,
  ) {
    return this.channelsService.createWorkspaceChannelChats(
      url,
      name,
      content,
      user.id,
    );
  }
  @Get(':name/unreads')
  getUnreads(
    @Param('url') url: string,
    @Param('name') name: string,
    @Query('after') after: number,
  ) {
    return this.channelsService.getChannelUnreadsCount(url, name, after);
  }

  @Post(':name/members')
  inviteMember() {}
}
