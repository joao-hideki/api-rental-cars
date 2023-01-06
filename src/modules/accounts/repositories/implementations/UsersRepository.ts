import { Repository, getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name, email, password, driver_license
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license
    });
    await this.repository.save(user);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const findedEmail = await this.repository.findOne({email});
    return findedEmail;
  }
}

export { UsersRepository };