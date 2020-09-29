import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInterface} from '../model/userModel';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
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
