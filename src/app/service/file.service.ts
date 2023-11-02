import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.apiUrl +'/files'

  constructor(private http: HttpClient) { }

  public save(id:number, audiofile: FormData, image: FormData) {
    return this.http.post(this.apiUrl + '/audio/save/' +id, audiofile);
  }
}
