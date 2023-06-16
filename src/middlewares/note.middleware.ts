import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { NoteType } from '../models/note.model';

export class NoteMiddleware {
  public static validateFieldsCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description, type } = req.body;

      if (!title) {
        return HttpResponse.fieldNotProvided(res, 'Titulo');
      }

      if (!description) {
        return HttpResponse.fieldNotProvided(res, 'Descrição');
      }

      const allowedTypes = Object.values(NoteType);

      if (!allowedTypes.includes(type)) {
        return HttpResponse.invalid(res, 'Tipo');
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
