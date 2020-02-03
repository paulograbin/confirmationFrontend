import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
// import 'rxjs/add/operator/filter';


@Injectable()
export class AuthService {

    constructor(public router: Router,
                private http: HttpClient) {
        localStorage.setItem('access_token',
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTgwMTYxODcxLCJleHAiOjE1ODI3NTM4NzF9.hroshGlEvjMYDbSoji6zRpSHZb_T3RCJHLgkesHgdS-IBzElnK_tbiCuUHl03LmT3NE5-IfKagT89Bg2VAU-LQ');
    }

    login(loginForm) {
        return this.http.post<any>(`/server/api/auth/authenticate`, loginForm)
            .pipe(
                map(
                    data => {
                        return data;
                    }
                )
            );
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
