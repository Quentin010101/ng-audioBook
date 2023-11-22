import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { of, tap } from 'rxjs';
import { ImageM } from '../model/file/ImageModel';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.apiUrl +'/files'
  images: ImageM[] = []

  constructor(private http: HttpClient) { }

  public save(id:number, file: FormData) {
    return this.http.post(this.apiUrl + '/audio/save/' +id, file);
  }

  public getImage(id: number){
    for(let i = 0; i < this.images.length; i++){
      if(this.images[i].id == id) return of(this.images[i].data)
    }
    return this.http.get(this.apiUrl + '/image/read/' + id, {responseType: 'blob'}).pipe(
      tap(data => this.images.push(new ImageM(id, data)))
    );
  }

  public getAudio(id: number){
    return this.http.get(this.apiUrl + '/audio/read/' + id, {responseType: 'blob'})
  }
}

