import { Router } from 'express';
import { SpecificationsRepositories } from '../modules/cars/repositories/implementations/SpecificationsRepositories';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepositories();

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body;
  const createSpecificationService = new CreateSpecificationService(specificationsRepository);
  const createdSpecification = createSpecificationService.execute({name, description});

  res.status(201).json(createdSpecification);
});

export { specificationsRoutes };