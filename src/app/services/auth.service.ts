import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/filter';


@Injectable()
export class AuthService {

    constructor(public router: Router) {
      console.log("Salvando token ...");

      localStorage.setItem('access_token',
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwbGdyYWJpbiIsImV4cCI6MTU3NzgwMTIxOCwiaWF0IjoxNTc3MTk2NDE4fQ.0LIJTrBMMn37ha6HaeMxq0mNx0ntIjc-QwmeTnMgn6eaeWtWEFGmjkziUUd8vmKSdWJxQP5FSWcA5ioWd62Pwg');
    }

    public login(): void {
      // this.auth0.authorize();
    }

    public handleAuthentication(): void {
        // this.auth0.parseHash((err, authResult) => {
        //   if (authResult && authResult.accessToken && authResult.idToken) {
        //     window.location.hash = '';
        //     this.setSession(authResult);
        //     this.router.navigate(['/admin']);
        //   } else if (err) {
        //     this.router.navigate(['/admin']);
        //     console.log(err);
        //   }
        // });
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
