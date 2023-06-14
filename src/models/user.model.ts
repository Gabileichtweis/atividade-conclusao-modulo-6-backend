import { Note } from './note.model';

export class User {
  public _notes: Note[];

  constructor(private _email: string, private _password: string) {
    this._notes = [];
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  public toJason() {
    return {
      email: this._email,
      password: this._password,
    };
  }
}
