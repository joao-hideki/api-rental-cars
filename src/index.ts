import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import './database';
import './shared/container';


const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.listen(3090, () => console.log('Server started at http://localhost:3090'));