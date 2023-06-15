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
      const { email } = req.params;

      const user = new UserRepository().getEmail(email);

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
      const { email } = req.body;

      if (!email) {
        return HttpResponse.fieldNotProvided(res, 'E-mail');
      }

      if (usersList.some((user) => user.email === email)) {
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
      const { password } = req.body;

      if (!password) {
        return HttpResponse.fieldNotProvided(res, 'Senha');
      }

      netx();
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
