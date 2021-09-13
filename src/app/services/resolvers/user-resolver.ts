import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {UserInterface} from '../../model/userModel';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<UserInterface> {

    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInterface> {
        const userId = route.paramMap.get('id');
        console.log(`Resolving user ${userId}`);

        if (isNaN(+userId)) {
            console.error('user it not valid');
        }

        return this.userService.getUser(Number(userId));
        // .pipe(
        //     // tap(x => console.log(x)),
        //     map(event => ({ event })),
        //     catchError(error => {
        //       console.error(`Resolving event failed`, error.error);
        //       return of({event: null, error: error.error});
        //     })
        // );
    }
}
