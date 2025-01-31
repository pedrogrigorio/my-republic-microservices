import { Notification } from '../../domain/entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract markAsRead(notificationId: number): Promise<void>;
  abstract markAllAsRead(recipientId: number): Promise<void>;
  abstract findAll(recipientId: number): Promise<Notification[]>;
  abstract findById(notificationId: number): Promise<Notification>;
  abstract getUnreadCount(recipientId: number): Promise<number>;
}
