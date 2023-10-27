import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getFile(){
    const headers = new HttpHeaders()
    headers.set('Content-Length', '10000')
    headers.set('Range', 'bytes 10000-19999')
    
    return this.http.get(environment.apiUrl + '/file/' + 1, {headers: headers, responseType: 'text'});
  }
}
