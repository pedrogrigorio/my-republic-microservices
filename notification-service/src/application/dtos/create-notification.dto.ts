import { NotificationType } from '../../domain/enums/notification-type';

export class CreateNotificationDto {
  recipientId: number;
  type: NotificationType;
  message: string;
}
