import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/CategoryModel';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl +"/category"

  constructor(private http : HttpClient) { }

  public getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl)
  }

  public save(category: Category): Observable<Category[]>{
    return this.http.post<Category[]>(this.apiUrl + "/save", category)
  }

  public delete(id: number): Observable<Category[]>{
    return this.http.delete<Category[]>(this.apiUrl + "/delete/" + id)
  }
}
