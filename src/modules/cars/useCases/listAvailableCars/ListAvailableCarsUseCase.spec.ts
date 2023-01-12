import { ICarsRepository } from '../../repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });
  it('should be able to list all available cars', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Test Car',
      description: 'Test description',
      daily_rate: 100,
      license_plate: 'xxx-000',
      fine_amount: 50,
      category_id: 'testCategoryId',
      brand: 'Test Brand'
    });
    const availableCars = await listCarsUseCase.execute({});
    expect(availableCars).toEqual([createdCar]);
  });
  it('should be able to list all available cars by brand', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Test Car',
      description: 'Test description',
      daily_rate: 100,
      license_plate: 'xxx-000',
      fine_amount: 50,
      category_id: 'testCategoryId',
      brand: 'Test Brand'
    });
    const availableCars = await listCarsUseCase.execute({
      brand: createdCar.brand
    });
    expect(availableCars).toEqual([createdCar]);
  });
  it('should be able to list all available cars by name', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Test Car',
      description: 'Test description',
      daily_rate: 100,
      license_plate: 'xxx-000',
      fine_amount: 50,
      category_id: 'testCategoryId',
      brand: 'Test Brand'
    });
    const availableCars = await listCarsUseCase.execute({
      name: createdCar.name
    });
    expect(availableCars).toEqual([createdCar]);
  });
  it('should be able to list all available cars by category id', async () => {
    const createdCar = await carsRepositoryInMemory.create({
      name: 'Test Car X',
      description: 'Test description',
      daily_rate: 100,
      license_plate: 'xxx-000',
      fine_amount: 50,
      category_id: 'testCategoryId',
      brand: 'Test Brand'
    });
    const createdCar2 = await carsRepositoryInMemory.create({
      name: '2',
      description: '2',
      daily_rate: 2,
      license_plate: '2',
      fine_amount: 2,
      category_id: '2',
      brand: '2'
    });
    const availableCars = await listCarsUseCase.execute({
      category_id: createdCar.category_id
    });
    console.log(createdCar2);
    expect(availableCars).toEqual([createdCar]);
  });
});
