import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, tap } from 'rxjs';
import { environment } from 'src/environment';
import { Theme } from '../model/theme/ThemeModel';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  apiUrl: string = environment.apiUrl

  baseMode: boolean = true
  baseTheme: string = "theme-3"

  isDarkMode = new Subject<boolean>()
  theme = new Subject<string>()

  themes: Theme[] = []

  constructor(private http: HttpClient) {
  }

  public getThemes(): Observable<Theme[]>{
    if(this.themes.length != 0) return of(this.themes)
    return this.http.get<Theme[]>(this.apiUrl + '/theme/all').pipe(
        tap(data => this.themes = data)
      )
  }

}
