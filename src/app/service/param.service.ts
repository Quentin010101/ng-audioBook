import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from '../model/user/ParamModel';
import { environment } from 'src/environment';
import { Theme } from '../model/theme/ThemeModel';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  public getParam(): Observable<Param>{
    return this.http.get<Param>(this.apiUrl + "/param")
  }

  public updateThemeParam(theme: Theme): Observable<Param>{
    return this.http.post<Param>(this.apiUrl + "/param/update/theme", theme)
  }

  public updateModeParam(mode: boolean): Observable<Param>{
    return this.http.post<Param>(this.apiUrl + "/param/update/mode", mode)
  }
}
