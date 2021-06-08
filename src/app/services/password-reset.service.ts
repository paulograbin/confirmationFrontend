import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PasswordRequest} from '../model/passwordRequest';
import {NewPasswordRequestResponse} from '../model/passwordRequestResponse';

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {

    constructor(private http: HttpClient) {
    }

    private backendUrl = environment.localApiAddress;
    private passwordResetUrl = this.backendUrl + '/reset';

    fetchPasswordRequest(code: string): Observable<PasswordRequest> {
        return this.http.get<PasswordRequest>(`${this.passwordResetUrl}/${code}`);
    }

    submitNewForgotPasswordRequest(value: string) {
        console.log('submitting forgot password request');

        return this.http.post<NewPasswordRequestResponse>(`${this.passwordResetUrl}/${value}`, null);
    }

    defineNewPasswordAfterForgot(newPasswordRequest: any) {
        console.log('Sending new password');

        return this.http.put(`${this.passwordResetUrl}`, newPasswordRequest);
    }
}
