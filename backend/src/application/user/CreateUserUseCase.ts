import { User } from '../../domain/user/User';
import { IUserRepository } from '../../domain/user/IUserRepository';

export interface CreateUserDTO {
  email: string;
  name: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = User.create(data.email, data.name);
    await this.userRepository.save(user);

    return user;
  }
}
