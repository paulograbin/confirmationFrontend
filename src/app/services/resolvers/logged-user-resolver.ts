import {Injectable} from '@angular/core';
import {UserInterface} from '../../model/userModel';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserResolver implements Resolve<UserInterface> {

    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInterface> {
        return this.userService.fetchDetailsAboutLoggedUser();
    }
}
