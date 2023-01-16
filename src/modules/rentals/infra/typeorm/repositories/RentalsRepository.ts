import { Repository, getRepository } from 'typeorm';
import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({car_id});
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({user_id});
  }
  async create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental> {
    const createdRental = this.repository.create({
      car_id,
      expected_return_date,
      user_id
    });
    await this.repository.save(createdRental);
    return createdRental;
  }
}

export {RentalsRepository};