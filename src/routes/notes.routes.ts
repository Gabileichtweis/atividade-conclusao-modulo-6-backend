import { Request, Router } from 'express';
import { NotesController } from '../controllers/note.controller';
import { UserMiddleware } from '../middlewares/user.middleware';
import { NoteMiddleware } from '../middlewares/note.middleware';

export const noteRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.get('/listNotes', new NotesController().listNotes);
  app.post(
    '/createNote',
    [UserMiddleware.validateUserExists, NoteMiddleware.validateFieldsCreate],
    new NotesController().createNotes
  );
};
