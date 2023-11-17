import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { User } from '../model/user/UserModel';
import { SignInRequest } from '../model/user/SignInRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl + "/user"

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/all")
  }

  lockingUser(id: number): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/locking/" + id)
  }

  unlockingUser(id: number): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + "/unLocking/" + id)
  }

  delete(id : number): Observable<User[]>{
    return this.http.delete<User[]>(this.apiUrl + '/delete/'+ id)
  }


}
