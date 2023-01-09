import { AppError } from '../../../../errors/AppError';
import { CateriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CateriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CateriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async() => {
    const createdCategory = await createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Category Description Test'
    });
    expect(createdCategory).toHaveProperty('id');
  });

  it('should not be able to create a new category with existing name', async() => {
    expect(async() => {
      await createCategoryUseCase.execute({
        name: 'Category Test',
        description: 'Category Description Test'
      });
      await createCategoryUseCase.execute({
        name: 'Category Test',
        description: 'Category Description Test'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});