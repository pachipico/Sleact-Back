import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from '../auth/logged-in.guard';

import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { User } from '../common/decorators/user.decorator';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Users } from 'src/entities/Users';
import { NotLoggedIn } from 'src/auth/not-logged-in.guard';

@UseInterceptors(UndefinedToNull)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: '유저 정보 가져오기' })
  @Get()
  getUsers(@User() user) {
    return user || false;
  }

  @ApiOperation({ summary: '회원가입' })
  @UseGuards(new NotLoggedIn())
  @Post()
  async join(@Body() body: JoinRequestDto) {
    await this.userService.join(body.email, body.password, body.nickname);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  async login(@User() user: Users) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(new LoggedInGuard())
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logout();
    res.clearCookies();
    res.send('logged out!');
  }
}
