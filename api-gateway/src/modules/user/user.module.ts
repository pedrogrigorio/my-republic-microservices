import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { HashingService } from '../auth/application/interfaces/hashing.service.interface';
import { BCryptHashingService } from '../auth/infrastrucutre/services/bcrypt-hashing.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: 'src/modules/user/proto/user.proto',
          url: 'user_service:3002',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: HashingService,
      useClass: BCryptHashingService,
    },
    {
      provide: 'UserService',
      useFactory: (userClient: ClientGrpc) => {
        return userClient.getService<UserService>('UserService');
      },
      inject: ['USER_SERVICE'],
    },
  ],
  exports: ['UserService'],
})
export class UserModule {}
