import { Note } from './notes.model';

export class User {
  public notes: Note[];

  constructor(private _email: string, private _password: string) {}

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
