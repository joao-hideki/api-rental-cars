import { Repository, getRepository } from 'typeorm';
import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private static INSTANCE: CategoriesRepository;
  private repository: Repository<Category>;

  private constructor() {
    this.repository = getRepository(Category);
  }

  public static getInstance(): CategoriesRepository {
    if(!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
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