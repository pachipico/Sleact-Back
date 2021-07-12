import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';

import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  @Post('register')
  postUsers(@Body() data: JoinRequestDto) {
    this.userService.postUsers(data.email, data.password, data.nickname);
  }

  @Post('login')
  logIn(@Req() req) {
    return req.user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {}
}
