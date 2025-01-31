import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';
import { NotificationRepository } from '../../application/interfaces/notification.repository.interface';
import { PrismaService } from '../services/prisma.service';
import { Notification } from '../../domain/entities/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        type: notification.type,
        message: notification.message,
        recipientId: notification.recipientId,
      },
    });
  }

  async findAll(recipientId: number): Promise<Notification[]> {
    const rawNotifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const notifications = rawNotifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );

    return notifications;
  }

  async findById(notificationId: number): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async markAsRead(notificationId: number): Promise<void> {
    await this.prisma.notification.update({
      data: {
        isRead: true,
      },
      where: {
        id: notificationId,
      },
    });
  }

  async markAllAsRead(recipientId: number): Promise<void> {
    await this.prisma.notification.updateMany({
      data: {
        isRead: true,
      },
      where: {
        recipientId: recipientId,
      },
    });
  }

  async getUnreadCount(recipientId: number): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
        isRead: false,
      },
    });

    return count;
  }
}
