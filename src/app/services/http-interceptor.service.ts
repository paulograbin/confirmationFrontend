import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(
        private basicAuthService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log('Intercepting 1...');

        let authenticationToken: string;

        if (this.basicAuthService.isAuthenticated()) {
            authenticationToken = this.basicAuthService.getAuthenticationToken();
        }

        const basicHeaderString = `Bearer ${authenticationToken}`;

        if (basicHeaderString) {
            request = request.clone({
                setHeaders: {
                    Authorization: basicHeaderString
                }
            });
        }

        return next.handle(request);
    }
}
