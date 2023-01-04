import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({name, description}: ICreateCategoryDTO): Category;
  list(): Category[];
  findByName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategoryDTO };