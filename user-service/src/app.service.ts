import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return { id: '', name: 'Not Found', email: '' };
    }
    return user;
  }
}
