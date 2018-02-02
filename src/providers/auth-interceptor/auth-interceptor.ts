import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorProvider implements HttpInterceptor {

  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZHVrZXNkZW5tYXJrLmRrIiwiaWF0IjoxNTE3MzY5ODg5LCJuYmYiOjE1MTczNjk4ODksImV4cCI6MTUxNzk3NDY4OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMzkiLCJyb2xlcyI6WyJzdWJzY3JpYmVyIl19fX0.OQmXXSH9-feH2jiNwJ2rV8N3gDPXnpPbYqyZm18ao1k';

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });

    return next.handle(req);
  }

}
