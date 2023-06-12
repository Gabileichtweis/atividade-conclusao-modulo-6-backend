import { Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { usersList } from '../data/users';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  public list(req: Request, res: Response) {
    try {
      return HttpResponse.success(res, 'ok', usersList);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { _email, _password } = req.body;

      const user = new User(_email, _password);
      usersList.push(user);

      HttpResponse.success(
        res,
        'Usuário cadastrado com sucesso',
        user.toJason()
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { _email, _password } = req.body;

      const user = new UserRepository().getEmail(_email);
      if (!user) {
        return HttpResponse.invalidCredentials(res);
      }
      if (user.password !== _password) {
        return HttpResponse.invalidCredentials(res);
      }
      return HttpResponse.success(res, 'Login realizado com sucesso', _email);
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
