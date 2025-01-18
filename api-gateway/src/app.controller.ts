import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface UserService {
  getUser(data: { id: string }): any;
}

@Controller()
export class AppController {
  private userService: UserService;

  constructor(@Inject('USER_SERVICE') private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser({ id });
  }
}
