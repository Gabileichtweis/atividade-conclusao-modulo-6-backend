import { usersList } from '../data/users';

export class UserRepository {
  public getEmail(email: string) {
    return usersList.find((user) => user.email === email);
  }
}
