import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity.js';
import { NotificationsGateway } from './notifications.gateway.js';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  // الاستماع لحدث إنشاء الطلب تلقائياً
  @OnEvent('order.created')
  async handleOrderCreated(payload: { userId: string; orderId: string; totalPrice: number }) {
    const notification = this.notificationsRepository.create({
      userId: payload.userId,
      title: 'تم إنشاء الطلب بنجاح 🛍️',
      message: `تم استلام طلبك رقم #${payload.orderId.substring(0, 8)} بقيمة ${payload.totalPrice} بنجاح.`,
    });

    const savedNotification = await this.notificationsRepository.save(notification);

    // دفع الإشعار لحظياً لمتصفح الويب (React)
    this.notificationsGateway.sendNotificationToUser(payload.userId, savedNotification);
  }

  // جلب إشعارات مستخدم معين
  async findAllByUser(userId: string): Promise<Notification[]> {
    return await this.notificationsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // تحديد الإشعار كـ "مقروء"
  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException('الإشعار غير موجود');
    }
    notification.isRead = true;
    return await this.notificationsRepository.save(notification);
  }
}