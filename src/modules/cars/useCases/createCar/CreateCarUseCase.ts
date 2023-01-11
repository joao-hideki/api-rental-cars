import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/typeorm/entities/Car';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    brand
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);
    if(carAlreadyExists) {
      throw new AppError('Car already exists!');
    }
    const createdCar = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand
    });
    return createdCar;
  }
}

export {CreateCarUseCase};