import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import type { Order } from './order.entity.js'; // <--- لاحظ استخدام type هنا
import { Product } from '../../products/entities/product.entity.js';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @ManyToOne('Order', (order: any) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}