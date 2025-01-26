import { UserRepository } from '../../application/interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  constructor() {}

  public users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(userId: number): Promise<User> {
    const user = this.users.find((item) => item.id === userId);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async create(user: User): Promise<User> {
    let id = 0;

    if (this.users.length > 0) {
      id = this.users.at(-1).id + 1;
    }

    const userWithId = new User(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        imgSrc: user.imgSrc,
      },
      id,
    );

    this.users.push(userWithId);

    return userWithId;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((item) => item.id === user.id);

    this.users[index] = user;

    return user;
  }

  async deleteById(userId: number): Promise<void> {
    const index = this.users.findIndex((item) => item.id === userId);

    this.users.splice(index, 1);
  }
}
