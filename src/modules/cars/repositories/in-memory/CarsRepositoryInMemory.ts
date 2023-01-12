import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const createdCar = new Car();
    Object.assign(createdCar, {
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id
    });
    this.cars.push(createdCar);
    return createdCar;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  async listAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if(
        car.available === true ||
        (brand && car.brand === brand) ||
        (name ?? car.name === name) ||
        (name ?? car.category_id === category_id)
      ) {
        return car;
      }
      return null;
    });
    return all;
  }
}

export {CarsRepositoryInMemory};