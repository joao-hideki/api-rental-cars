import { inject, injectable } from 'tsyringe';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({name, brand, category_id}: IRequest): Promise<Car[]> {
    const availableCars = await this.carsRepository.listAvailable(brand, name, category_id);
    return availableCars;
  }
}

export {ListCarsUseCase};