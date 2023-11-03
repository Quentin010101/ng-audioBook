import { Component, Input } from '@angular/core';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { Category } from 'src/app/model/CategoryModel';

@Component({
  selector: 'app-library-category',
  templateUrl: './library-category.component.html',
  styleUrls: ['./library-category.component.scss']
})
export class LibraryCategoryComponent {
  @Input() category!: Category
  @Input() audioBooks!: AudioBook[]
  audioBooksCategory!: AudioBook[]

  ngOnInit(){
    this.audioBooksCategory = this.audioBooks.filter((book)=> {
      return book.category.id == this.category.id
    })
  }
}
