import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate() {
        if (this.authService.isAuthenticated()) {
            // console.log('Authenticated!');
            return true;
        } else {
            // console.log('NOT Authenticated!');

            this.router.navigate(['login']);
            return false;
        }
    }
}
