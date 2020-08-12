import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from './user.service';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private userService: UserService,
                private router: Router) {
    }

    canActivate() {
        console.log('Checking if user has access to this page...');

        if (this.userService.getCanOpenPanel()) {
            console.log('Yep!!');
            return true;
        } else {
            console.log('Nope!');

            this.router.navigate(['/']);
            return false;
        }
    }
}
