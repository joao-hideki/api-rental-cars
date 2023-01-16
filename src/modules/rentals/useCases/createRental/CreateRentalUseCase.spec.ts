import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { DateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';
import { RentalsRepositoryInMemory } from '../../repositories/in-memories/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalsRepositoryInMemory: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: IDateProvider;

describe('Create Rental', () => {
  beforeEach(() => {
    createRentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      createRentalsRepositoryInMemory,
      dateProvider
    );
  });
  it('shoul be able to create a new rental', async () => {
    const createdRental = await createRentalUseCase.execute({
      user_id: 't3st3',
      car_id: 't3st3',
      expected_return_date: dateProvider.currentDateAdd24Hours()
    });
    expect(createdRental).toHaveProperty('id');
    expect(createdRental).toHaveProperty('start_date');
  });
  it('shoul not be to crate a new rental if there user is already renting', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 't3st3',
        car_id: 't3st3',
        expected_return_date: dateProvider.currentDateAdd24Hours()
      });
      await createRentalUseCase.execute({
        user_id: 't3st3',
        car_id: 't3st3',
        expected_return_date: dateProvider.currentDateAdd24Hours()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('shoul not be to crate a new rental if there car is already rented', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'Teste 1',
        car_id: 't3st3',
        expected_return_date: dateProvider.currentDateAdd24Hours()
      });
      await createRentalUseCase.execute({
        user_id: 'Teste 2',
        car_id: 't3st3',
        expected_return_date: dateProvider.currentDateAdd24Hours()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('shoul not be to crate a new rental if expected return date less than 24', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'Teste 2',
        car_id: 't3st3',
        expected_return_date: dateProvider.currentDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
