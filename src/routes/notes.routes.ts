import { Request, Router } from 'express';
import { NotesController } from '../controllers/note.controller';
import { UserMiddleware } from '../middlewares/user.middleware';
import { NoteMiddleware } from '../middlewares/note.middleware';

export const noteRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.get(
    '/',
    [UserMiddleware.validateUserExists],
    new NotesController().listNotes
  );

  app.post(
    '/',
    [NoteMiddleware.validateFieldsCreate],
    new NotesController().createNote
  );

  app.delete('/:id', new NotesController().deleteNote);

  app.put('/:id', new NotesController().updateNote);

  return app;
};
