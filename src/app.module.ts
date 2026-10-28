import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { User } from './users/entities/user.entity.js';
import { Product } from './products/entities/product.entity.js';
import { Order } from './orders/entities/order.entity.js';
import { Notification } from './notifications/entities/notification.entity.js';
import { OrderItem } from './orders/entities/order-item.entity.js';

import { EventEmitterModule } from '@nestjs/event-emitter'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'ecommerce_db',
      entities: [User, Product, Order, Notification,OrderItem,Notification], // تأكد من إضافة جميع الكيانات هنا
      synchronize: true, // يقوم بإنشاء الجداول تلقائياً في قاعدة البيانات
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    NotificationsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }