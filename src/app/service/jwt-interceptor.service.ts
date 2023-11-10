import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const logged: boolean = this._authService.isLoggedIn();
    const token: string = this._authService.getAuthorizationToken();
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    
    if (logged && isApiUrl) {
        console.log("send request")
        request = request.clone({
            setHeaders: { Authorization: `${token}` }
        });
    }

    return next.handle(request);

  }
}
