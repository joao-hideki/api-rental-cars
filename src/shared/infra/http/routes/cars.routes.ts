import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.get('/available', listAvailableCarController.handle);

export {carsRoutes};