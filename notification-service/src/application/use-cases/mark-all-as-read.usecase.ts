import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../interfaces/notification.repository.interface';

@Injectable()
export class MarkAllAsReadUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(recipientId: number) {
    await this.notificationRepository.markAllAsRead(recipientId);
  }
}
