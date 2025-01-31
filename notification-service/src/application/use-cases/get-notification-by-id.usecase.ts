import { NotificationNotFoundException } from '../../domain/exceptions/notification-not-found.exception';
import { NotificationRepository } from '../interfaces/notification.repository.interface';
import { NotificationMapper } from '../mappers/notification.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetNotificationByIdUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(notificationId: number) {
    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundException(
        `Notification with id ${notificationId} not found`,
      );
    }

    return NotificationMapper.toDto(notification);
  }
}
