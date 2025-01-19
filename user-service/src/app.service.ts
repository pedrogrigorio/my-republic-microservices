import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  private users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];

  async getUserTest(id: string) {
    // const user = this.users.find((user) => user.id === id);
    const numberId = parseInt(id);

    const user = await this.prisma.user.findUnique({
      where: {
        id: numberId,
      },
    });

    if (!user) {
      return { id: '', name: 'Not Found', email: '' };
    }

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  async getUserById(id: string) {
    // const user = this.users.find((user) => user.id === id);
    console.log(id);
    const numberId = parseInt(id);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: numberId,
      },
    });

    if (existingUser) {
      return { id, name: 'User Already Exists', email: '' };
    }

    const user = await this.prisma.user.create({
      data: {
        name: `Usuário ${numberId}`,
        email: `test${numberId}@gmail.com`,
        password: '123',
        gender: 'MALE',
      },
    });

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  }
}
