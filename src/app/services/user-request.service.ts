import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UserRequestInterface} from '../model/userRequestInterface';
import {ConvertUserRequestResponse} from './responses/convertUserRequestResponse';

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

    convertRequestToUser(requestId: string, convertUserRequest: any) {
        return this.http.post<ConvertUserRequestResponse>(`${this.userRequestUrl}/${requestId}`, convertUserRequest);
    }

    getAllRequests(): Observable<UserRequestInterface[]> {
        return this.http.get<UserRequestInterface[]>(`${this.userRequestUrl}`);
    }
}
