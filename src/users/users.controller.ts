import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { User } from '../common/decorators/user.decorator';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNull)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: '유저 정보 가져오기' })
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @Post('register')
  postUsers(@Body() data: JoinRequestDto) {
    this.userService.postUsers(data.email, data.password, data.nickname);
  }

  @Post('login')
  logIn(@User() user) {
    return user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {}
}
