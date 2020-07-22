import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInterface} from '../model/userModel';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    private backendUrl = environment.localApiAddress;
    private userServiceUrl = this.backendUrl + '/users';

    fetchDetailsAboutLoggedUser(): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.userServiceUrl}/me`)
            .pipe(
                // map(user => { this.loggedUser = user; }),
                // tap(data => console.log(JSON.stringify(data))),
                // tap(data => console.log(data)),
                catchError(this.handleError)
            );
    }

    getAllUsers(): Observable<UserInterface[]> {
        console.log('get all users from server');
        return this.http.get<UserInterface[]>(`${this.userServiceUrl}`);
    }

    getUser(id: number): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.userServiceUrl}/${id}`);
    }

    getCanAccessAdmin(): Observable<boolean> {
        // console.log('check if user can access admin panel');
        return this.http.get<boolean>(`${this.userServiceUrl}/panel`);
    }

    createUser(user) {
        const body = JSON.stringify(user);

        return this.http.post(`${this.userServiceUrl}`, body);
    }

    inactivateUser(id: number) {
        console.log('Inactivating user...');

        return this.http.delete(`${this.userServiceUrl}/${id}`);
    }

    activate(id: number) {
        console.log('Activating user...');

        return this.http.put(`${this.userServiceUrl}/${id}/activate`, null);
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

    updateUser(id: number, passwordUpdateRequest: any) {
        return this.http.put(`${this.userServiceUrl}/${id}`, passwordUpdateRequest);
    }
}
