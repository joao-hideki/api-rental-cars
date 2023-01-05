import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { container } from 'tsyringe';

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
    const createdSpecification = await createSpecificationUseCase.execute({name, description});

    return res.status(201).json(createdSpecification);
  }
}

export { CreateSpecificationController };