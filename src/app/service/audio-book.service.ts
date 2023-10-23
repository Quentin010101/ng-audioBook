import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioBook } from '../model/AudioBookModel';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioBookService {
  
  private apiUrl = environment.apiUrl + '/book'

  constructor(private http: HttpClient) { }

  public getAudioBook(id: number): Observable<AudioBook>{
    return this.http.get<AudioBook>(this.apiUrl + '/' + id);
  }

  public getAllAudioBook(): Observable<AudioBook[]>{
    return this.http.get<AudioBook[]>(this.apiUrl + '/all');
  }
}
