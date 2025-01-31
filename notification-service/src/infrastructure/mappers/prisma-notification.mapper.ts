import { NotificationType } from '../../domain/enums/notification-type';
import { Notification } from '../../domain/entities/notification';
import {
  Notification as RawNotification,
} from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): RawNotification {
    return {
      id: notification.id,
      type: notification.type,
      isRead: notification.isRead,
      message: notification.message,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        message: raw.message,
        isRead: raw.isRead,
        createdAt: raw.createdAt,
        type: raw.type as NotificationType,
        recipientId: raw.recipientId,
      },
      raw.id,
    );
  }
}
