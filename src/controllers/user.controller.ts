import { Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { usersList } from '../data/user';
import { User } from '../models/user.model';

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
      const { userEmail, userPassword } = req.body;
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
