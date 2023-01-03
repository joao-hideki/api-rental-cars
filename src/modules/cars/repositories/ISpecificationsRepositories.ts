import { Specification } from '../models/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepositories {
  create({ name, description }: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification;
}

export {ISpecificationsRepositories, ICreateSpecificationDTO};