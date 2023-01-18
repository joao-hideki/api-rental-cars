import 'reflect-metadata';
import createConnection from '../typeorm';
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import '../../container';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(router);
app.use(errorHandler);

export {app};