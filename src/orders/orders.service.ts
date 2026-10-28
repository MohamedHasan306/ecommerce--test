import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { User } from '../users/entities/user.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private eventEmitter: EventEmitter2,
  ) { }

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const itemDto of createOrderDto.items) {
      const product = await this.productsRepository.findOne({ where: { id: itemDto.productId } });
      if (!product) {
        throw new NotFoundException(`المنتج برقم ${itemDto.productId} غير موجود`);
      }

      if (product.stock < itemDto.quantity) {
        throw new BadRequestException(`الكمية غير متاحة للمنتج: ${product.name}`);
      }

      // خصم الكمية من المخزن
      product.stock -= itemDto.quantity;
      await this.productsRepository.save(product);

      totalPrice += Number(product.price) * itemDto.quantity;

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = itemDto.quantity;
      orderItem.price = product.price;
      orderItems.push(orderItem);
    }

    const order = this.ordersRepository.create({
      user: { id: userId } as User,
      orderItems,
      totalPrice,
      status: 'pending',
    });

    this.eventEmitter.emit('order.created', {
  userId,
  orderId: order.id,
  totalPrice: order.totalPrice,
});

    return await this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
  return await this.ordersRepository.find({ 
    relations: ['user', 'orderItems', 'orderItems.product'] as any 
  });
}

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product'] as any,
    });
    if (!order) {
      throw new NotFoundException('الطلب غير موجود');
    }
    return order;
  }
}