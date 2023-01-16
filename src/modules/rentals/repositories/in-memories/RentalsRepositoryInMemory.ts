import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async create({
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const createdRental = new Rental();
    Object.assign(createdRental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });
    this.rentals.push(createdRental);
    return createdRental;
  }
}

export {RentalsRepositoryInMemory};