import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/user/User';
import { IUserRepository } from '../../domain/user/IUserRepository';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        createdAt: user.getCreatedAt(),
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.name);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.name);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new User(user.id, user.email, user.name));
  }
}
