import { Injectable } from '@angular/core';
import { AudioBook } from '../model/book/AudioBookModel';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  audioBooks!: AudioBook[]

  constructor() { }
}
