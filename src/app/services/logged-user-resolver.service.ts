import {Injectable} from '@angular/core';
import {UserModel} from '../model/userModel';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserResolverService implements Resolve<UserModel> {

    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<UserModel> {

        console.log('Resolving logged user');
        return this.userService.fetchDetailsAboutLoggedUser();
    }

}
