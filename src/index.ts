import cors from 'cors';
import express, { Request, Response } from 'express';
import { appRoutes } from './routes/user.routes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', appRoutes());

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando na porta ' + process.env.PORT + '!');
});
