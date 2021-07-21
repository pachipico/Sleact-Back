import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from '../middlewares/logger.middleware';
import * as ormconfig from '../ormconfig';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';

import { DMsModule } from './dms/dms.module';
import { Users } from './entities/Users';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DMsModule,
    TypeOrmModule.forFeature([Users]),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
