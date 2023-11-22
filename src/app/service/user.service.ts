import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environment';
import { User } from '../model/user/UserModel';
import { ResponseGenerique } from '../model/ResponseGeneriqueModel';
import { SignInRequest } from '../model/user/SignInRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl + "/user"
  users: User[] = []

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    if(this.users.length != 0) return of(this.users)
    return this.http.get<User[]>(this.apiUrl + "/all").pipe(
        tap(data => this.users = data)
      )
  }

  lockingUser(id: number): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/locking/" + id)
  }

  unlockingUser(id: number): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/unLocking/" + id)
  }

  delete(id : number): Observable<User[]>{
    return this.http.delete<User[]>(this.apiUrl + '/delete/'+ id).pipe(
      tap(data => this.users = data)
    )
  }
  
  signin(user: SignInRequest): Observable<ResponseGenerique<User[]>>{
    return this.http.post<ResponseGenerique<User[]>>(this.apiUrl + "/signin", user).pipe(
      tap(data => this.users = data.object)
    )
  }

}
