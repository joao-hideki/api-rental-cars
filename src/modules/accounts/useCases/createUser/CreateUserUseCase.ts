import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<User> {
    const createdUser = await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_license
    });

    return createdUser;
  }
}

export { CreateUserUseCase };