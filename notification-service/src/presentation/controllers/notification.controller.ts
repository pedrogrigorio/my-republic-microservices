import { Controller } from '@nestjs/common';
import { GetAllNotificationsUseCase } from '../../application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from '../../application/use-cases/get-notification-by-id.usecase';
import { CreateNotificationUseCase } from '../../application/use-cases/create-notification.usecase';
import { GetUnreadCountUseCase } from '../../application/use-cases/get-unread-count.usecase';
import { MarkAllAsReadUseCase } from '../../application/use-cases/mark-all-as-read.usecase';
import { MarkAsReadUseCase } from '../../application/use-cases/mark-as-read.usecase';
import { GrpcExceptionHandler } from '../handlers/grpc-exception-handler';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationController {
  constructor(
    private getAllNotificationsUseCase: GetAllNotificationsUseCase,
    private getNotificationByIdUseCase: GetNotificationByIdUseCase,
    private createNotificationUseCase: CreateNotificationUseCase,
    private getUnreadCountUseCase: GetUnreadCountUseCase,
    private markAllAsReadUseCase: MarkAllAsReadUseCase,
    private markAsReadUseCase: MarkAsReadUseCase,
  ) {}

  async createNotification(data: any) {
    try {
      await this.createNotificationUseCase.execute(data.createNotificationDto);
    } catch (error) {
      console.log(error)
    }
  }

  @GrpcMethod('NotificationService', 'getAllNotifications')
  async getAllNotifications(data: any) {
    try {
      return await this.getAllNotificationsUseCase.execute(data.userId);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
  
  @GrpcMethod('NotificationService', 'getUnreadCount')
  async getUnreadCount(data: any) {
    try {
      return await this.getUnreadCountUseCase.execute(data.userId);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('NotificationService', 'getNotification')
  async getNotification(data: any) {
    try {
      return await this.getNotificationByIdUseCase.execute(data.notificationId);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('NotificationService', 'markAsRead')
  async markAsRead(data: any) {
    try {
      await this.markAsReadUseCase.execute(data.notificationId);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('NotificationService', 'markAllAsRead')
  async markAllAsRead(data: any) {
    try {
      await this.markAllAsReadUseCase.execute(data.userId);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
}
