import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { router } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import './database';
import './shared/container';
import { errorHandler } from './middlewares/errorHandler';


const server = express();

server.use(express.json());
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
server.use(router);
server.use(errorHandler);

server.listen(3090, () => console.log('Server started at http://localhost:3090'));