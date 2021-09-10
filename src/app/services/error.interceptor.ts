import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepting 2...');

        return next.handle(req).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                console.log(' log out ? ');
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(err);
            return throwError(err);
        }));
    }
}
