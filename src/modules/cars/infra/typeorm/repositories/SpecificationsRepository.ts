import { Repository, getRepository } from 'typeorm';
import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository';


class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor () {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({name, description});
    await this.repository.save(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({name});
  }
  async listByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }
}

export {SpecificationsRepository};