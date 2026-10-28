import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { NotificationsController } from './notifications.controller.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import{EventEmitterModule} from '@nestjs/event-emitter';
import { Notification } from './entities/notification.entity.js';
import { NotificationsGateway } from './notifications.gateway.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    EventEmitterModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
