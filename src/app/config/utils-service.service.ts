import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {
  openBehavior = new BehaviorSubject<boolean>(true)
  
  constructor() { }


}
