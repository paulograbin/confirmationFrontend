import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PasswordRequest} from '../../model/passwordRequest';
import {Observable} from 'rxjs';
import {PasswordResetService} from '../password-reset.service';

@Injectable({
    providedIn: 'root'
})
export class PasswordRequestResolverService implements Resolve<PasswordRequest> {

    constructor(private passwordResetService: PasswordResetService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PasswordRequest> {
        const requestCode = route.paramMap.get('passwordRequestCode');
        console.log(`Resolving password request with code ${requestCode}`);

        return this.passwordResetService.fetchPasswordRequest(requestCode);
    }
}
