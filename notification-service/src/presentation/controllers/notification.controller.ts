import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { GetAllNotificationsUseCase } from '../../application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from '../../application/use-cases/get-notification-by-id.usecase';
import { CreateNotificationUseCase } from '../../application/use-cases/create-notification.usecase';
import { GetUnreadCountUseCase } from '../../application/use-cases/get-unread-count.usecase';
import { MarkAllAsReadUseCase } from '../../application/use-cases/mark-all-as-read.usecase';
import { GrpcExceptionHandler } from '../handlers/grpc-exception-handler';
import { MarkAsReadUseCase } from '../../application/use-cases/mark-as-read.usecase';
import { NotificationType } from 'src/domain/enums/notification-type';
import { Controller } from '@nestjs/common';

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

  @MessagePattern('application.accepted')
  async handleApplicationAccepted(@Payload() data: any) {
    try {
      await this.createNotificationUseCase.execute({
        recipientId: data.applicantId,
        type: NotificationType.APPLICATION_ACCEPTED,
        message: `Você foi aceito na república ${data.advertisementTitle}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  @MessagePattern('advertisement.paused')
  async handleAdvertisementPaused(@Payload() data: any) {
    try {
      await this.createNotificationUseCase.execute({
        recipientId: data.ownerId,
        type: NotificationType.ADVERTISEMENT_PAUSED,
        message: `Seu anúncio entitulado ${data.title} foi pausado automaticamente devido a quantidade de vagas remanescentes.`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  @GrpcMethod('NotificationService', 'getAllNotifications')
  async getAllNotifications(data: any) {
    try {
      const notifications = await this.getAllNotificationsUseCase.execute(data.userId);
      
      return { notifications }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
  
  @GrpcMethod('NotificationService', 'getUnreadCount')
  async getUnreadCount(data: any) {
    try {
      const count = await this.getUnreadCountUseCase.execute(data.userId);
      return { count }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('NotificationService', 'getNotificationById')
  async getNotification(data: any) {
    try {
      const notification = await this.getNotificationByIdUseCase.execute(data.id);
      return { notification }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('NotificationService', 'markAsRead')
  async markAsRead(data: any) {
    try {
      console.log(data)
      await this.markAsReadUseCase.execute(data.id);
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
