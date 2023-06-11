import { v4 as createUuid } from 'uuid';

export class Note {
  private _id: string;

  constructor(private _title: string, private _description: string) {
    this._id = createUuid();
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get id(): string {
    return this.id;
  }

  public updateNote() {
    //lógica atualizar
  }
}
