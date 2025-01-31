import { NotificationRepository } from '../interfaces/notification.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUnreadCountUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(recipientId: number) {
    const count = await this.notificationRepository.getUnreadCount(recipientId);

    return count;
  }
}
