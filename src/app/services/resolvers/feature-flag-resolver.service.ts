import {Injectable} from '@angular/core';
import {FeatureFlagServiceService} from '../feature-flag-service.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {FeatureFlag} from '../../model/featureFlagModel';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FeatureFlagResolverService implements Resolve<FeatureFlag[]> {

    constructor(private featureFlagService: FeatureFlagServiceService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FeatureFlag[]> {
        return this.featureFlagService.fetchAll()
            .pipe(
                tap(
                    data => console.log(data)
                ));
    }
}
