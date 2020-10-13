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
                        console.log('authenticate response', data);
                        this.setSession(data);

                        return data;
                    }
                )
            );
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        localStorage.setItem('access_token', authResult.token);
        localStorage.setItem('expirationDate', authResult.expirationDate);
    }

    public getAuthenticationToken(): string {
        return localStorage.getItem('access_token');
    }


    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('expirationDate');
        // Go back to the home route
        this.router.navigate(['/login']);
    }

    public isAuthenticated(): boolean {
        const accessToken = localStorage.getItem('access_token');
        const expirationDate = localStorage.getItem('expirationDate');

        if (accessToken === null || expirationDate === null) {
            console.log('Not authenticated.');
            return false;
        }

        const computedExpirationDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
        computedExpirationDate.setUTCMilliseconds(Number(expirationDate));

        const now = new Date();

        // console.log('now', now);
        // console.log('expiration date', computedExpirationDate);

        if (now > computedExpirationDate) {
            console.log('Expired!!!');
            this.logout();
            return false;
        }

        return true;
    }
}
