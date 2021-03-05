import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {
  private users: User[] = [
    new User('Romuald', 'Blondiaux', 'roblo@epse.be', 'Coca Cola', ['coder', 'boire du café'])
  ];
  userSubject = new Subject<User[]>();

  emitUsers(): void {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User): void {
    this.users.push(user);
    this.emitUsers();
  }
}
