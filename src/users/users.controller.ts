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

import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { User } from '../common/decorators/user.decorator';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Users } from 'src/entities/Users';

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

  @Post()
  async join(@Body() body: JoinRequestDto) {
    await this.userService.join(body.email, body.password, body.nickname);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: Users) {
    return user;
  }
}
