import { Repository, getRepository } from 'typeorm';
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository';
import { CarImages } from '../entities/CarImages';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImages>;

  constructor() {
    this.repository = getRepository(CarImages);
  }

  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImages = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImages);
    return carImages;
  }
}

export {CarsImagesRepository};