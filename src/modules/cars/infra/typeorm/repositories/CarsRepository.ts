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
  async listAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    const carQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', {available: true});
    if(brand) {
      carQuery.andWhere('brand = :brand', {brand});
    }
    if(name) {
      carQuery.andWhere('name = :name', {name});
    }
    if(category_id) {
      carQuery.andWhere('category_id = :category_id', {category_id});
    }
    const availableCars = await carQuery.getMany();
    return availableCars;
  }
}

export {CarsRepository};