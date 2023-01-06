import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { hash } from 'bcrypt';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);
    if(emailAlreadyExists) {
      throw new Error('Email already exists');
    }
    password = await hash(password, 8);
    const createdUser = await this.usersRepository.create({
      name,
      email,
      password,
      driver_license
    });

    return createdUser;
  }
}

export { CreateUserUseCase };