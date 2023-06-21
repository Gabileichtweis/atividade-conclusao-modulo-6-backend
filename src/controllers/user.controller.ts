import { Request, Response } from 'express';
import { HttpResponse } from '../util/http-response.adapter';
import { usersList } from '../data/users';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  public list(req: Request, res: Response) {
    try {
      return HttpResponse.success(
        res,
        'ok',
        usersList.map((user) => user.toJason())
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = new User(email, password);
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
      const { email, password } = req.body;

      if (!email) {
        return HttpResponse.fieldNotProvided(res, 'E-mail');
      }

      if (!password) {
        return HttpResponse.fieldNotProvided(res, 'Senha');
      }

      const user = new UserRepository().getEmail(email);
      if (!user) {
        return HttpResponse.invalidCredentials(res);
      }
      if (user.password !== password) {
        return HttpResponse.invalidCredentials(res);
      }
      return HttpResponse.success(
        res,
        'Login realizado com sucesso',
        user.toJason()
      );
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
