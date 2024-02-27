import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token =
      'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIzMCIsInRlbmFudF9lbWFpbCI6InByZWV0LnBhdGVsQGdvZGlnaXRhbHRjLmNvbSIsImNyZWF0ZWRfb24iOiIyLzE1LzIwMjQgMTI6NDI6MzggUE0iLCJleHAiOjE3MDkyODkxNjB9.PNVySgoFq4CN0T1r8Pyc2wiWJq0GjL4_sROc2Uv6tus';
    if (token == null || token == 'null') {
      request = request.clone({
        setHeaders: {
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
