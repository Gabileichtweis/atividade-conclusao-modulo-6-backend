import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserMiddleware } from '../middlewares/user.middleware';
import { noteRoutes } from './notes.routes';

export const appRoutes = () => {
  const app = Router();

  app.get('/', new UserController().list);

  app.post(
    '/create',
    [UserMiddleware.validateUserEmail, UserMiddleware.validateUserPassword],
    new UserController().create
  );

  app.post('/login', new UserController().login);

  app.use('/:email/notes', noteRoutes());

  return app;
};
