import { Repository, getRepository } from 'typeorm';
import { ICategoriesRepository, ICreateCategoryDTO } from '../../../repositories/ICategoriesRepository';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({name});
    return category;
  }
}

export {CategoriesRepository};