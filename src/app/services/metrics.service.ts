import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MetricsResponse} from '../model/metricsResponse';


@Injectable({
    providedIn: 'root'
})
export class MetricsService {

    constructor(private http: HttpClient) {
    }

    private backendUrl = environment.localApiAddress;
    private metricsServiceUrl = this.backendUrl + '/metrics';

    fetchAllMetrics(): Observable<MetricsResponse> {
        // console.log('get all users from server');
        return this.http.get<MetricsResponse>(`${this.metricsServiceUrl}`);
    }
}
