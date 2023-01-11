import { Repository, getRepository } from 'typeorm';
import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    fine_amount,
    daily_rate,
    license_plate,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const createdCar = this.repository.create({
      name,
      description,
      fine_amount,
      daily_rate,
      license_plate,
      brand,
      category_id
    });
    await this.repository.save(createdCar);
    return createdCar;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({license_plate});
  }
}

export {CarsRepository};