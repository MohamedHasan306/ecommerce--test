import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string; // معرف المستخدم المستلم للإشعار

  @Column()
  title: string; // عنوان الإشعار

  @Column('text')
  message: string; // نص الإشعار

  @Column({ default: false })
  isRead: boolean; // هل تم قراءة الإشعار أم لا

  @CreateDateColumn()
  createdAt: Date;
}