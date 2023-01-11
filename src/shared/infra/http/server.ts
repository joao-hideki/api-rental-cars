import 'reflect-metadata';
import createConnection from '../typeorm';
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import '../../container';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

createConnection('localhost');
const server = express();

server.use(express.json());
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
server.use(router);
server.use(errorHandler);

server.listen(3090, () => console.log('Server started at http://localhost:3090'));