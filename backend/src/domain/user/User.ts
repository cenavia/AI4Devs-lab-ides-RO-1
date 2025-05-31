import { randomUUID } from 'crypto';

export class User {
  private readonly id: string;
  private readonly email: string;
  private readonly name: string;
  private readonly createdAt: Date;

  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public static create(email: string, name: string): User {
    const id = randomUUID();
    return new User(id, email, name);
  }
}
