import { Controller, Inject, Param, Patch, Get } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { firstValueFrom } from 'rxjs';
import { CurrentUserId } from 'src/core/decorators/current-user-id.decorator';

@Controller('notifications')
export class NotificationController {
  private notificationService: NotificationService;

  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationService =
      this.notificationClient.getService<NotificationService>(
        'NotificationService',
      );
  }

  @Get()
  async getAllNotifications(@CurrentUserId() userId: number) {
    const { notifications } = await firstValueFrom(
      this.notificationService.getAllNotifications({ userId }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    if (!notifications) return;

    const formattedNotifications = notifications.map((notification: any) => ({
      ...notification,
      createdAt: new Date(notification.createdAt), // Convertendo para Date
    }));

    return formattedNotifications;
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUserId() userId: number) {
    const count = await firstValueFrom(
      this.notificationService.getUnreadCount({ userId }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return count;
  }

  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notificationId = parseInt(id);

    const { notification } = await firstValueFrom(
      this.notificationService.getNotificationById({ id: notificationId }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    if (!notification) return;

    const formattedNotification = {
      ...notification,
      createdAt: new Date(notification.createdAt), // Convertendo para Date
    };

    return formattedNotification;
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    const notificationId = parseInt(id);

    await firstValueFrom(
      this.notificationService.markAsRead({ id: notificationId }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Patch('read-all')
  async markAllAsRead(@CurrentUserId() userId: number) {
    await firstValueFrom(
      this.notificationService.markAllAsRead({ userId }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }
}
