import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(3090, () => console.log('Server started at http://localhost:3090'));