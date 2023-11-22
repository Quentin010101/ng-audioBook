import { Component } from '@angular/core';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { Category } from 'src/app/model/category/CategoryModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { CategoryService } from 'src/app/service/category.service';



@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  audioBooks!: AudioBook[]
  categories!: Category[]

  constructor(private _audioService: AudioBookService, private _categoryService: CategoryService){}

  ngOnInit(){
    this._audioService.getAllAudioBook().subscribe({
      next: (data) => this.audioBooks = data
    })
    this._categoryService.getAll().subscribe({
      next: (data) => this.categories = data
    })
  }
}
