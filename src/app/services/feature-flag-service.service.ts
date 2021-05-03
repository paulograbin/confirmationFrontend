import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeatureFlag} from '../model/featureFlagModel';
import {logger} from 'codelyzer/util/logger';

@Injectable({
    providedIn: 'root'
})
export class FeatureFlagServiceService {

    backendUrl = environment.localApiAddress;
    featureFlagControllerURL = this.backendUrl + '/feature';

    constructor(private http: HttpClient) {
    }

    fetchAll(): Observable<FeatureFlag[]> {
        console.log(`Checking status of ALL feature`);

        return this.http.get<FeatureFlag[]>(`${this.featureFlagControllerURL}`);
    }

    fetchSingle(featureKey: string): Observable<FeatureFlag> {
        console.log(`Checking status of feature ${featureKey}`);

        return this.http.get<FeatureFlag>(`${this.featureFlagControllerURL}/${featureKey}`);
    }
}
