import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { UserRepository } from '../../application/interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { PrismaService } from 'src/infrastructure/services/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user);

    const createdUser = await this.prisma.user.create({
      data: raw,
    });

    return PrismaUserMapper.toDomain(createdUser);
  }

  async update(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user);

    const updatedUser = await this.prisma.user.update({
      data: raw,
      where: {
        id: user.id,
      },
    });

    return PrismaUserMapper.toDomain(updatedUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => PrismaUserMapper.toDomain(user));
  }

  async findById(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async deleteById(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
