import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {brand, name, category_id} = req.query;
    const listCarsUseCase = container.resolve(ListCarsUseCase);
    const availableCars = await listCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string
    });
    return res.json(availableCars);
  }
}

export {ListAvailableCarController};