import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: ICarsRepository;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async() => {
    const createdCar = await createCarUseCase.execute({
      name: 'Test Car',
      description: 'Test description',
      daily_rate: 100,
      license_plate: 'xxx-000',
      fine_amount: 50,
      category_id: 'testCategoryId',
      brand: 'Test Brand'
    });
    expect(createdCar).toHaveProperty('id');
  });
  it('should not be able to crate a car with existing license plate', async() => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Test 1 Car',
        description: 'Test 1 description',
        daily_rate: 100,
        license_plate: 'xxx-000',
        fine_amount: 50,
        category_id: 'test1CategoryId',
        brand: 'Test 1 Brand'
      });
      await createCarUseCase.execute({
        name: 'Test 2 Car',
        description: 'Test 2 description',
        daily_rate: 200,
        license_plate: 'xxx-000',
        fine_amount: 100,
        category_id: 'test2CategoryId',
        brand: 'Test 2 Brand'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to create a new car with available true by default', async() => {
    const createdCar = await createCarUseCase.execute({
      name: 'Test Car',
      description: 'Test description',
      daily_rate: 100,
      license_plate: 'xxx-000',
      fine_amount: 50,
      category_id: 'testCategoryId',
      brand: 'Test Brand'
    });
    expect(createdCar).toHaveProperty('available', true);
  });
});

