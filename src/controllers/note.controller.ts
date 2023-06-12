import { Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { Note } from '../models/note.model';
import { notesList } from '../data/notes';
import { UserRepository } from '../repositories/user.repository';

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

  public createNotes(req: Request, res: Response) {
    try {
      const { _email } = req.params;
      const { _title, _description } = req.body;

      const user = new UserRepository().getEmail(_email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      const note = new Note(_title, _description, user);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
