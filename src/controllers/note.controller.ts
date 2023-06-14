import { Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { Note } from '../models/note.model';
import { notesList } from '../data/notes';
import { UserRepository } from '../repositories/user.repository';
import { NotesRepository } from '../repositories/note.respository';

export class NotesController {
  public listNotes(req: Request, res: Response) {
    try {
      return HttpResponse.success(
        res,
        'Recados listados com sucesso',
        notesList
      );
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

      const noteFound = user.notes.findIndex((note) => note.id === id);

      if (!noteFound) {
        return HttpResponse.notFound(res, 'Recado');
      }

      return HttpResponse.success(
        res,
        'Recado deletado com sucesso',
        noteFound
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

      console.log('chegou aqui');

      const noteFound = user.notes.find((note) => note.id === id);
      console.log(noteFound);

      if (!noteFound) {
        return HttpResponse.notFound(res, 'Recado');
      }

      return console.log('deu bom');
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
