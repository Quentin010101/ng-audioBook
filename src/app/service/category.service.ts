import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Category } from '../model/category/CategoryModel';
import { environment } from 'src/environment';
import { CategoryDelete } from '../model/category/CategoryDeleteModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl +"/category"

  categories: Category[] = []

  constructor(private http : HttpClient) { }

  public getAll(): Observable<Category[]>{
    if(this.categories.length != 0) return of(this.categories)
    return this.http.get<Category[]>(this.apiUrl).pipe(
        tap(data => this.categories = data)
      )
  }

  public save(category: Category): Observable<Category[]>{
    return this.http.post<Category[]>(this.apiUrl + "/save", category).pipe(
      tap(data => this.categories = data)
    )
  }

  public delete(id: number): Observable<CategoryDelete>{
    return this.http.delete<CategoryDelete>(this.apiUrl + "/delete/" + id).pipe(
      tap(data => this.categories = data.categories)
    )
  }
}
