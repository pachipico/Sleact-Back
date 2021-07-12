import { Controller, Get, Post, Query } from '@nestjs/common';

import { DmsService } from './dms.service';

@Controller(`api/workspaces/:url/dms`)
export class DmsController {
  constructor(private dmsService: DmsService) {}

  @Get(`:id/chats`)
  getChat(@Query() query) {
    console.log(query.perPage, query.page);
  }

  @Post(`:id/chats`)
  postChat() {}
}
