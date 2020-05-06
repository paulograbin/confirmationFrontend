import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInterface} from '../model/userModel';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    fetchDetailsAboutLoggedUser(): Observable<UserInterface> {
        return this.http.get<UserInterface>('/server/users/me')
            .pipe(
                // map(user => { this.loggedUser = user; }),
                // tap(data => console.log(JSON.stringify(data))),
                // tap(data => console.log(data)),
                catchError(this.handleError)
            );
    }

    getAllUsers() {
        console.log('get all users from server');
        return this.http.get<UserInterface[]>('/server/users');
    }

    getUser(id: number) {
        return this.http.get<UserModel>('/server/users/' + id);
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

    private handleError(err) {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error ocurred: ${err.error.message}`;
        } else {
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }

        console.error(err);
        return throwError(errorMessage);
    }
}
