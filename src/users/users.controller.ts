import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { User } from '../common/decorators/user.decorator';
import { UndefinedToNull } from 'src/common/interceptors/undefinedToNull.interceptor';
import { UserDto } from 'src/common/dto/user.dto';

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

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @Post('login')
  logIn(@User() user) {
    return user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {}
}
