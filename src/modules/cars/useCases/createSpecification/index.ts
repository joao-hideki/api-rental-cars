import { SpecificationsRepositories } from '../../repositories/implementations/SpecificationsRepositories';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { CreateSpecificationController } from './createSpecificationController';

const specificationsRepository = new SpecificationsRepositories();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };