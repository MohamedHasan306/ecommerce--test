import { Controller, Get, Param, Patch } from '@nestjs/common';

import { NotificationsService } from './notifications.service.js';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':userId')
  
  findAllByUser(@Param('userId') userId: string) {
    return this.notificationsService.findAllByUser(userId);
  }

  @Patch(':id/read')
  
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}