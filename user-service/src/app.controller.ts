import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @GrpcMethod('UserService', 'getAllUsers')
  // async GetAllUsers() {
  //   console.log('Get All Users');
  //   const users = await this.appService.getAllUsers();
  //   return { users };
  // }

  // @GrpcMethod('UserService', 'getUserById')
  // async getUserById(data: any) {
  //   const user = await this.appService.getUserById(data.id);

  //   return { user };
  // }

  // @GrpcMethod('UserService', 'deleteUser')
  // async deleteUser(data: any) {
  //   console.log('Delete User');
  //   console.log(data);
  //   return;
  //   return this.appService.getUserTest(data.id);
  // }
}
