import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioBook } from '../model/book/AudioBookModel';
import { environment } from 'src/environment';
import { Observable, shareReplay } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AudioBookService {
  
  private apiUrl = environment.apiUrl + '/book'

  constructor(private http: HttpClient, private _cacheService: CacheService) { }

  public getAudioBook(id: number): Observable<AudioBook>{
    return this.http.get<AudioBook>(this.apiUrl + '/' + id);
  }

  public getAllAudioBook(): Observable<AudioBook[]>{
    return this.http.get<AudioBook[]>(this.apiUrl + '/all')
  }

  public save(audioBook : AudioBook): Observable<AudioBook>{
    return this.http.post<AudioBook>(this.apiUrl + '/save', audioBook)
  }
}
