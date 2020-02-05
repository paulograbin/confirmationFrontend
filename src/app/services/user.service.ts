import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    console.log('get all users');
    return this.http.get('/server/users');
  }

  getUser(id: number) {
    return this.http.get<User>('/server/users/' + id);
  }

  createUser(user) {
    const body = JSON.stringify(user);

    return this.http.post('/server/users', body);
  }

  inactivateUser(id: number) {
    console.log('Inactivating user...');

    return this.http.delete('/server/users/' + id);
  }

  activate(id: number) {
    console.log('Activating user...');

    return this.http.put('/server/users/' + id + '/activate', null);
  }
}
