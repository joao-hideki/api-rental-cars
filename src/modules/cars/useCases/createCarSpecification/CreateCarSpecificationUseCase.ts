import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({car_id, specifications_id}: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);
    if(!carAlreadyExists) {
      throw new AppError('Car does not exists');
    }
    const specifications = await this.specificationsRepository.listByIds(specifications_id);
    carAlreadyExists.specifications = specifications;
    return await this.carsRepository.create(carAlreadyExists);
  }
}

export {CreateCarSpecificationUseCase};