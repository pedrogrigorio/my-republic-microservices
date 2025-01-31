import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { NotificationController } from './presentation/controllers/notification.controller';
import { GetAllNotificationsUseCase } from './application/use-cases/get-all-notifications.usecase';
import { GetNotificationByIdUseCase } from './application/use-cases/get-notification-by-id.usecase';
import { CreateNotificationUseCase } from './application/use-cases/create-notification.usecase';
import { GetUnreadCountUseCase } from './application/use-cases/get-unread-count.usecase';
import { MarkAllAsReadUseCase } from './application/use-cases/mark-all-as-read.usecase';
import { MarkAsReadUseCase } from './application/use-cases/mark-as-read.usecase';
import { PrismaService } from './infrastructure/services/prisma.service';
import { NotificationRepository } from './application/interfaces/notification.repository.interface';
import { PrismaNotificationRepository } from './infrastructure/repositories/prisma-notification-repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    GetAllNotificationsUseCase,
    GetNotificationByIdUseCase,
    CreateNotificationUseCase,
    GetUnreadCountUseCase,
    MarkAllAsReadUseCase,
    MarkAsReadUseCase,
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
})
export class AppModule {}
