import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRequestInterface} from '../../model/userRequestInterface';
import {UserRequestService} from '../user-request.service';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserRequestResolverService implements Resolve<UserRequestInterface> {

    constructor(private userRequestService: UserRequestService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserRequestInterface> {
        const requestId = route.paramMap.get('requestNumber');
        console.log(`Resolving request ${requestId}`);

        return this.userRequestService.getUserRequest(requestId)
            .pipe(
                tap(x => {
                    console.log('resolver ');
                    console.log(x);
                })
                //     map(event => ({ event })),
                //     catchError(error => {
                //       console.error(`Resolving event failed`, error.error);
                //       return of({event: null, error: error.error});
            );
    }
}
