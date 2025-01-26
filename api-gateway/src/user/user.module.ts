import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { ValidateUserUseCase } from './validate-user.usecase';
import { HashingService } from 'src/auth/application/interfaces/hashing.service.interface';
import { BCryptHashingService } from 'src/auth/infrastrucutre/services/bcrypt-hashing.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: 'src/user/proto/user.proto',
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
