import { Response } from 'express';

export class HttpResponse {
  public static success(res: Response, message: string, data: any) {
    return res.status(200).send({
      ok: true,
      message,
      data,
    });
  }

  public static created(res: Response, message: string, data: any) {
    return res.status(201).send({
      ok: true,
      message,
      data,
    });
  }

  public static fieldNotProvided(res: Response, field: string) {
    return res.status(400).send({
      ok: false,
      message: `${field} não informado.`,
    });
  }

  public static notFound(res: Response, entity: string) {
    return res.status(404).send({
      ok: false,
      message: `${entity} não encontrado.`,
    });
  }

  public static invalid(res: Response, field: string) {
    return res.status(400).send({
      ok: false,
      message: `${field} é inválido`,
    });
  }

  public static invalidCredentials(res: Response) {
    return res.status(401).send({
      ok: false,
      message: 'Acesso não autorizado',
    });
  }

  public static genericError(res: Response, error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
}
