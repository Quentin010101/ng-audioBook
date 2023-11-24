import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {
  openBehavior = new BehaviorSubject<boolean>(true)
  screenSizeSubject = new BehaviorSubject<string>("")
  
  constructor() { }

}
