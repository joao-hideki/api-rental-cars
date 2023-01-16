import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const carAlreadyRented = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if(carAlreadyRented) {
      throw new AppError('Car already rented');
    }
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if(rentalOpenToUser) {
      throw new AppError('There is a rental in progress from user');
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.currentDate(),
      expected_return_date
    );
    const minimumHourToRentalCar = 24;
    if(compare < minimumHourToRentalCar) {
      throw new AppError('Need to rent the car for  minimum 24 hours!');
    }

    const createdRental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });
    return createdRental;
  }
}

export {CreateRentalUseCase};