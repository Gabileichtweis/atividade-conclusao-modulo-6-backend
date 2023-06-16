import { v4 as createUuid } from 'uuid';
import { User } from './user.model';

export enum NoteType {
  archived = 'A',
  overall = 'O',
}

export class Note {
  private _id: string;

  constructor(
    private _title: string,
    private _description: string,
    private _type: NoteType,
    private _user: User
  ) {
    this._id = createUuid();
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get type(): NoteType {
    return this._type;
  }

  public get user(): User {
    return this._user;
  }

  public set title(title: string) {
    this._title = title;
  }

  public set description(description: string) {
    this._description = description;
  }

  public set type(type: NoteType) {
    this._type = type;
  }

  public toJason() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      type: this._type,
    };
  }
}
