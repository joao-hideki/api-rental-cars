import { Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name, email, password, driver_license, id, avatar
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id
    });
    await this.repository.save(user);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({email});
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };