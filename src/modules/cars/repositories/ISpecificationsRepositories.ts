import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepositories {
  create({ name, description }: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification;
}

export {ISpecificationsRepositories, ICreateSpecificationDTO};