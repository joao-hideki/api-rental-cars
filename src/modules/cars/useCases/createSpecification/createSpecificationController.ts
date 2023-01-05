import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { container } from 'tsyringe';

class CreateSpecificationController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
    const createdSpecification = createSpecificationUseCase.execute({name, description});

    return res.status(201).json(createdSpecification);
  }
}

export { CreateSpecificationController };