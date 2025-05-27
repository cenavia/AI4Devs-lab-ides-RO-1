import { CreateUserUseCase } from '../../application/user/CreateUserUseCase';
import { IUserRepository } from '../../domain/user/IUserRepository';
import { User } from '../../domain/user/User';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should create a new user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.save.mockResolvedValue();

    const user = await createUserUseCase.execute(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.getEmail()).toBe(userData.email);
    expect(user.getName()).toBe(userData.name);
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
  });

  it('should throw an error if user with email already exists', async () => {
    const userData = {
      email: 'existing@example.com',
      name: 'Existing User',
    };

    const existingUser = User.create(userData.email, userData.name);
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      'User with this email already exists',
    );
  });
});
