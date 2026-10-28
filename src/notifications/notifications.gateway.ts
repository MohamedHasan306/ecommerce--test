import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // يمكنك لاحقاً تحديد رابط تطبيق الـ React حصراً للأمان
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  // عندما يقوم مستخدم بتسجيل الدخول في React، ينضم إلى غرفة خاصة به
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    client.join(`user_${userId}`);
    console.log(`User ${userId} joined room: user_${userId}`);
  }

  // دالة لإرسال الإشعار للمستخدم لحظياً عبر السوكت
  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user_${userId}`).emit('newNotification', notification);
  }
}