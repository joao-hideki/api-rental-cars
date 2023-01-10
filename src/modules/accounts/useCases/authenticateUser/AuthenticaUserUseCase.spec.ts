import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticaUserUseCase } from './AuthenticaUserUseCase';

let authenticaUserUseCase: AuthenticaUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticaUserUseCase = new AuthenticaUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test',
      email: 'teste@email.com',
      password: '123',
      driver_license: '0001'
    };
    await createUserUseCase.execute(user);
    const result = await authenticaUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticaUserUseCase.execute({
        email: 'teste@email.com',
        password: '123'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should nto be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test',
      email: 'teste@email.com',
      password: '123',
      driver_license: '0001'
    };
    await createUserUseCase.execute(user);
    expect(async() => {
      await authenticaUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});