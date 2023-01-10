import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({name, description}: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if(specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    }

    const createdSpecification = await this.specificationsRepository.create({
      name,
      description
    });
    return createdSpecification;
  }
}

export { CreateSpecificationUseCase };