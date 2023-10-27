import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("test")
    if(this.auth.isLoggedIn()){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', this.auth.getAuthorizationToken())
      });
      console.log(authReq)
      return next.handle(authReq)
    }

    return next.handle(req)
  }
}
