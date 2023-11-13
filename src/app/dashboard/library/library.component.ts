import { Component } from '@angular/core';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { Category } from 'src/app/model/category/CategoryModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { CategoryService } from 'src/app/service/category.service';
import { SharedAudioService } from 'src/app/config/shared-audio.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  audioBooks!: AudioBook[]
  category!: Category[]

  constructor(private _audioBookService: AudioBookService, private _categoryService : CategoryService){}

  ngOnInit(){
    this._audioBookService.getAllAudioBook().subscribe({
      next: (data) => this.audioBooks = data
    })
    this._categoryService.getAll().subscribe({
      next: (data) => this.category = data
    })
  }
}
