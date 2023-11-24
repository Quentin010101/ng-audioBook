import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchContainer } from '../model/search/SearchContainerModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = 'AIzaSyAV-kvCd--S_RxC1RLBnS0p29ghsQS8uiM'
  private apiUrl: string = 'https://www.googleapis.com/books/v1/volumes?q='

  constructor(private http: HttpClient) { }

  getBooksInfo(search: string): Observable<SearchContainer>{
    return this.http.get<SearchContainer>(this.apiUrl + search + '&key=' + this.apiKey)
  }


}
