import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: ICarsRepository;
let specificationRepositoryInMemory: ISpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });
  it('should be able to add a new specification to the car', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Test 1 Car',
      description: 'Test 1 description',
      daily_rate: 100,
      license_plate: 'xxx-000',
      fine_amount: 50,
      category_id: 'test1CategoryId',
      brand: 'Test 1 Brand'
    });
    const createdSpecification = await specificationRepositoryInMemory.create({
      name: 'Test',
      description: 'test'
    });
    const car = await createCarSpecificationUseCase.execute({
      car_id: createdCar.id,
      specifications_id: [createdSpecification.id]
    });

    await carsRepositoryInMemory.listAvailable();

    expect(car).toHaveProperty('specifications', [createdSpecification]);
  });
  it('should not be able to add a new specification to a non-existent carcar', async () => {
    expect(async() => {
      await createCarSpecificationUseCase.execute({
        car_id: 'testId',
        specifications_id: ['testSpecification']
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});