import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioBook } from '../model/book/AudioBookModel';
import { environment } from 'src/environment';
import { Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AudioBookService {
  
  private apiUrl = environment.apiUrl + '/book'

  books: AudioBook[] = []

  constructor(private http: HttpClient) { }

  public getAudioBook(id: number): Observable<AudioBook>{
    return this.http.get<AudioBook>(this.apiUrl + '/' + id);
  }

  public getAllAudioBook(): Observable<AudioBook[]>{
    if(this.books.length != 0) return of(this.books)
    return this.http.get<AudioBook[]>(this.apiUrl + '/all').pipe(
        tap(data => this.books = data)
      )
  }

  public save(audioBook : AudioBook): Observable<AudioBook[]>{
    return this.http.post<AudioBook[]>(this.apiUrl + '/save', audioBook).pipe(
      tap(data => this.books = data)
    )
  }
}
