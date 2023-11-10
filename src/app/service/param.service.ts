import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from '../model/user/ParamModel';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  public getParam(): Observable<Param>{
    return this.http.get<Param>(this.apiUrl + "/param")
  }
}
