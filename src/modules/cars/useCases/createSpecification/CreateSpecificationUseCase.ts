import { Specification } from '../../entities/Specification';
import { ISpecificationsRepositories } from '../../repositories/ISpecificationsRepositories';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepositories: ISpecificationsRepositories) {}

  execute({name, description}: IRequest): Specification {
    const specificationAlreadyExists = this.specificationsRepositories.findByName(name);

    if(specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    const createdSpecification = this.specificationsRepositories.create({
      name,
      description
    });
    return createdSpecification;
  }
}

export { CreateSpecificationUseCase };