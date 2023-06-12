import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { UserRepository } from '../repositories/user.repository';
import { usersList } from '../data/users';

export class UserMiddleware {
  public static validateUserExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _email } = req.body;

      const user = new UserRepository().getEmail(_email);

      if (!user) {
        return HttpResponse.notFound(res, 'Usuário');
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public static validateUserEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _email } = req.body;

      if (!_email) {
        return HttpResponse.fieldNotProvided(res, 'E-mail');
      }

      if (usersList.some((user) => user.email === _email)) {
        return HttpResponse.invalid(res, 'E-mail');
      }

      next();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public static validateUserPassword(
    req: Request,
    res: Response,
    netx: NextFunction
  ) {
    try {
      const { _password } = req.body;

      if (!_password) {
        return HttpResponse.fieldNotProvided(res, 'Senha');
      }

      netx();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
