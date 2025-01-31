import { NotificationRepository } from '../interfaces/notification.repository.interface';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { Notification } from '../../domain/entities/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(createNotificationDto: CreateNotificationDto): Promise<void> {
    const notification = new Notification({
      recipientId: createNotificationDto.recipientId,
      message: createNotificationDto.message,
      type: createNotificationDto.type,
    });

    await this.notificationRepository.create(notification);
  }
}
