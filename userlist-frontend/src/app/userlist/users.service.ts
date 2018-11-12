import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends RestService<User> {

  constructor(injector: Injector) {
    super(User, 'users', injector);
  }
}
