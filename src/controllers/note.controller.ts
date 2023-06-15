import { Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { Note } from '../models/note.model';
import { UserRepository } from '../repositories/user.repository';
import { NotesRepository } from '../repositories/note.respository';

export class NotesController {
  public listNotes(req: Request, res: Response) {
    try {
      const { email } = req.params;

      let notes = new NotesRepository().list(email);

      return HttpResponse.success(res, 'Recados listados com sucesso', notes);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public createNote(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const { title, description } = req.body;

      const user = new UserRepository().getEmail(email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      const newNote = new Note(title, description, user);
      new NotesRepository().create(newNote);

      return HttpResponse.created(res, 'Recado criado com sucesso', newNote);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public deleteNote(req: Request, res: Response) {
    try {
      const { email, id } = req.params;

      const user = new UserRepository().getEmail(email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      const noteIndex = new NotesRepository().findIndex(id);

      if (noteIndex < 0) {
        return HttpResponse.notFound(res, 'Recado');
      }

      new NotesRepository().delete(noteIndex);

      const notes = new NotesRepository().list(email);

      return HttpResponse.success(
        res,
        'Recado deletado com sucesso',
        notes.map((notes) => notes)
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public updateNote(req: Request, res: Response) {
    try {
      const { email, id } = req.params;
      const { title, description } = req.body;

      const user = new UserRepository().getEmail(email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      const note = new NotesRepository().getNote(id);

      if (!note) {
        return HttpResponse.notFound(res, 'Recado');
      }

      if (title) {
        note.title = title;
      }

      if (description) {
        note.description = description;
      }

      return HttpResponse.created(res, 'Recado criado com sucesso', note);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
