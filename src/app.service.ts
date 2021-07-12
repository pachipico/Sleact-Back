import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSecret(): string {
    return process.env.SECRET;
  }
}
