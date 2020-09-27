import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UserRequestInterface} from '../model/userRequestInterface';

@Injectable({
    providedIn: 'root'
})
export class UserRequestService {

    constructor(private http: HttpClient) {
    }

    private backendUrl = environment.localApiAddress;
    private userRequestUrl = this.backendUrl + '/userrequest';

    getUserRequest(id: string): Observable<UserRequestInterface> {
        return this.http.get<UserRequestInterface>(`${this.userRequestUrl}/${id}`);
    }
}
