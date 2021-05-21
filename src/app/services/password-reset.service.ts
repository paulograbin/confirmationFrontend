import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PasswordRequestModel} from '../model/passwordRequest';

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {

    constructor(private http: HttpClient) {
    }

    private backendUrl = environment.localApiAddress;
    private passwordResetUrl = this.backendUrl + '/reset';

    fetchPasswordRequest(code: string): Observable<PasswordRequestModel> {
        return this.http.get<PasswordRequestModel>(`${this.passwordResetUrl}/${code}`);
    }
}
