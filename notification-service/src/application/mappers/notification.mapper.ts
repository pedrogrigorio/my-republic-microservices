import { NotificationResponseDto } from '../dtos/notification-response.dto';
import { Notification } from '../../domain/entities/notification';

export class NotificationMapper {
  static toDto(notification: Notification): NotificationResponseDto {
    return {
      id: notification.id,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      type: notification.type,
      recipientId: notification.recipientId,
    };
  }
}
