import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';

const carsRoutes = Router();
const createCarControlle = new CreateCarController();

carsRoutes.post('/', createCarControlle.handle);

export {carsRoutes};