import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environment';
import { LoginRequest } from '../model/auth/AuthRequestModel';
import { LoginResponse } from '../model/auth/AuthResponseModel';
import { Router } from '@angular/router';
import { SignInRequest } from '../model/user/SignInRequest';
import { User } from '../model/user/UserModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) { }

  public login(auth: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.apiUrl + '/login', auth).pipe(
      tap(response => this.setSession(response)),
    )
  }

  public signin(user: SignInRequest): Observable<User>{
    return this.http.post<User>(this.apiUrl + "/user/save", user);
  }

  public logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("pseudo")
    localStorage.removeItem("expirationTime")
    this.router.navigate(['login'])
  }

  private setSession(authResult: LoginResponse) {
    localStorage.setItem('pseudo', authResult.pseudo)
    localStorage.setItem('role', authResult.role)
    localStorage.setItem('token', authResult.token)
    localStorage.setItem("expirationTime", authResult.expirationDate.toString())
  }  

  public isLoggedIn(): boolean {
    const expiration = localStorage.getItem("expirationTime")
    const now = new Date().getTime()
    if(expiration != null){
      if(parseInt(expiration) > now){
        return true
      }
    }
    return false
  }

  public getAuthorizationToken(): string{
    const token = localStorage.getItem('token')
    return 'Bearer ' + token
  }

  public getPseudo(): string {
    const pseudo = localStorage.getItem('pseudo')
    if(pseudo == null) {
      this.logout()
      return ''
    }
    return pseudo
  }

  private getRole(): string{
    const role = localStorage.getItem('role')
    if(role == null) {
      this.logout()
      return ''
    }
    return role
  }

  public isAdmin(){
    return this.getRole() == 'ROLE_ADMIN'
  }

}


