import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';

export class NoteMiddleware {
  public static validateFieldsCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return HttpResponse.fieldNotProvided(res, 'Titulo');
      }

      if (!description) {
        return HttpResponse.fieldNotProvided(res, 'Descrição');
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
