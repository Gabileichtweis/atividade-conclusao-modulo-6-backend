import { usersList } from '../data/user';

export class UserRepository {
  public getEmail(email: string) {
    return usersList.find((user) => user.email === email);
  }
}
