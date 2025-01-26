import { Injectable } from '@nestjs/common';
import { PrismaService } from './infrastructure/services/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  // async getAllUsers() {
  //   const users = await this.prisma.user.findMany();

  //   console.log('busquei usuários');
  //   const usersList = users.map((user) => ({
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     imgSrc: user.imgSrc,
  //     gender: user.gender,
  //   }));

  //   console.log(usersList);
  //   return usersList;
  // }

  // async getUserById(id: any) {
  //   const existingUser = await this.prisma.user.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!existingUser) {
  //     console.log('Não tem usuário');
  //   }

  //   if (!existingUser.imgSrc) {
  //     existingUser.imgSrc = '';
  //   }

  //   return {
  //     id: existingUser.id,
  //     name: existingUser.name,
  //     email: existingUser.email,
  //     imgSrc: existingUser.imgSrc,
  //     gender: existingUser.gender,
  //   };
  // }
}
