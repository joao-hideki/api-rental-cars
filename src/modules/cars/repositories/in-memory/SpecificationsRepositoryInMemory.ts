import { Specification } from '../../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const createdSpecification = new Specification();
    Object.assign(createdSpecification, {
      name,
      description
    });
    this.specifications.push(createdSpecification);
    return createdSpecification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name);
  }
  async listByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) => ids.includes(specification.id));
  }
}

export {SpecificationRepositoryInMemory};