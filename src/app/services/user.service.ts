import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private users: User[] = [
    new User('Romuald', 'Blondiaux', 'roblo@epse.be', 'Coca Cola', ['coder', 'boire du café'])
  ];
  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }

  emitUsers(): void {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User): void {
    this.users.push(user);
    this.emitUsers();
  }

  saveUsersToServer(): void {
    this.httpClient
      .put('https://database-80ac3-default-rtdb.europe-west1.firebasedatabase.app/users.json', this.users)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getUsersFromServer(): void {
    this.httpClient
      .get<any[]>('https://database-80ac3-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .subscribe(
        (response) => {
          this.users = response;
          this.emitUsers();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  
}
