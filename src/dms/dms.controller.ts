import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';

import { DmsService } from './dms.service';

@UseInterceptors(UndefinedToNull)
@ApiTags('DM')
@Controller(`api/workspaces/:url/dms`)
export class DmsController {
  constructor(private dmsService: DmsService) {}

  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '한번에 가져오는 개수.',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '불러올 페이지',
  })
  @Get(`:id/chats`)
  getChat(@Query() query) {
    console.log(query.perPage, query.page);
  }

  @Post(`:id/chats`)
  postChat() {}
}
