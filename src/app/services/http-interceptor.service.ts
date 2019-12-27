import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private basicAuthService : AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // tslint:disable-next-line:max-line-length
    const basicHeaderString = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwbGdyYWJpbiIsImV4cCI6MTU3NzgwMTIxOCwiaWF0IjoxNTc3MTk2NDE4fQ.0LIJTrBMMn37ha6HaeMxq0mNx0ntIjc-QwmeTnMgn6eaeWtWEFGmjkziUUd8vmKSdWJxQP5FSWcA5ioWd62Pwg';
    const username = 'plgrabin';

    console.log('seta token na request');

    if (basicHeaderString && username) {

      request = request.clone({
        setHeaders: {
          Authorization: basicHeaderString
        }
      });
    }

    return next.handle(request);
  }
}
