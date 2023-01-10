import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CateriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const createdCategory = new Category();
    Object.assign(createdCategory, {
      name,
      description
    });
    this.categories.push(createdCategory);
    return createdCategory;
  }
  async list(): Promise<Category[]> {
    const allCategories = this.categories;
    return allCategories;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export {CateriesRepositoryInMemory};