import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable()
export class AuthService {

    constructor(public router: Router,
                private http: HttpClient) {
    }

    backendUrl = environment.localApiAddress;

    login(loginForm) {
        return this.http.post<any>(`${this.backendUrl}/api/auth/authenticate`, loginForm)
            .pipe(
                map(
                    data => {
                        this.setSession(data);

                        return data;
                    }
                )
            );
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        // const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.token);
        // localStorage.setItem('id_token', authResult.idToken);
        // localStorage.setItem('expires_at', expiresAt);
    }

    public getAuthenticationToken(): string {
        return localStorage.getItem('access_token');
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/login']);
    }

    public isAuthenticated(): boolean {
        // console.log('Okay, lets check if you are authenticated');

        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            // console.log('Yees you are!!');
            return true;
        }

        return false;
        // // Check whether the current time is past the
        // // access token's expiry time
        // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        // console.log(expiresAt);
        // return new Date().getTime() < expiresAt;
    }
}
