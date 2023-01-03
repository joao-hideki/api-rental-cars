import fs from 'fs';
import { parse as csvParse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCatgory {
  name: string,
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRespository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCatgory[]> {
    return new Promise((resolve, rejecet) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCatgory[] = [];
      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile.on('data', async(line) => {
        const [ name, description ] = line;
        categories.push({
          name,
          description
        });
      }).on('end', () => {
        resolve(categories);
      }).on('error', (error) => {
        rejecet(error);
      });
      return categories;
    });
  }

  async execute(file: Express.Multer.File): Promise<void>  {
    const categories = await this.loadCategories(file);
    categories.map((category) => {
      const { name, description } = category;
      const alreadyExistsCategory = this.categoriesRespository.findByName(name);
      if(!alreadyExistsCategory) {
        this.categoriesRespository.create({
          name,
          description
        });
      }
    });
  }
}

export { ImportCategoryUseCase };