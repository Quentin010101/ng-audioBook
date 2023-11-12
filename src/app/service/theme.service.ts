import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environment';
import { Theme } from '../model/theme/ThemeModel';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  apiUrl: string = environment.apiUrl

  isDarkMode = new Subject<boolean>()
  theme = new Subject<string>()

  constructor(private http: HttpClient) {
    this.isDarkMode.next(false)
    this.theme.next("theme-1")
  }

  public getThemes(): Observable<Theme[]>{
    return this.http.get<Theme[]>(this.apiUrl + '/theme/all')
  }

}
