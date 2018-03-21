import { AuthServiceProvider } from './../auth-service/auth-service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptorProvider implements HttpInterceptor {

  constructor(private authService: AuthServiceProvider) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.url.includes('dukesdenmark.dk:50080/api')) {
      const token = this.authService.getToken();
      const newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${token}`
        )
      });
      return next.handle(newReq);
    }
    return next.handle(req);
  }

}
