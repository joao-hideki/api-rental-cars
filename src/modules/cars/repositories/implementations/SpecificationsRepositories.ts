import { Specification } from '../../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepositories } from '../ISpecificationsRepositories';

class SpecificationsRepositories implements ISpecificationsRepositories {
  private specifications: Specification[];

  constructor () {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find((specification) => specification.name === name);
    return specification;
  }
}

export {SpecificationsRepositories};