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

    private SHOW_RESET_PASSWORD_BUTTON = 'ENABLE_RESET_PASSWORD';
    private ENABLE_PASSWORD_RESET = 'ENABLE_RESET_PASSWORD';

    constructor(private http: HttpClient) {
    }

    fetchAll(): Observable<FeatureFlag[]> {
        console.log(`Checking status of ALL feature`);

        return this.http.get<FeatureFlag[]>(`${this.featureFlagControllerURL}`);
    }

    fetchShowResetButton() {
        return this.fetchSingle(this.SHOW_RESET_PASSWORD_BUTTON);
    }

    fetchPasswordResetEnabled() {
        return this.fetchSingle(this.ENABLE_PASSWORD_RESET);
    }

    fetchSingle(featureKey: string): Observable<FeatureFlag> {
        console.log(`Checking status of feature ${featureKey}`);

        return this.http.get<FeatureFlag>(`${this.featureFlagControllerURL}/${featureKey}`);
    }
}
