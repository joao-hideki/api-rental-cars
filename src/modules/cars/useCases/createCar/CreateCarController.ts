import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCarUseCase';
import { Request, Response } from 'express';
import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    }: ICreateCarDTO = req.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const createdCar = await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand
    });
    return res.status(201).json(createdCar);
  }
}

export {CreateCarController};