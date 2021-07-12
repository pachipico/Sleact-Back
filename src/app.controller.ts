import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UndefinedToNull } from './common/interceptors/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNull)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSecret(): string {
    return this.appService.getSecret();
  }
}
