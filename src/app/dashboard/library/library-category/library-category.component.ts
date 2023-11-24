import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { Category } from 'src/app/model/category/CategoryModel';

@Component({
  selector: 'app-library-category',
  templateUrl: './library-category.component.html',
  styleUrls: ['./library-category.component.scss']
})
export class LibraryCategoryComponent {
  @Input() category!: Category
  @Input() audioBooks!: AudioBook[]
  audioBooksCategory!: AudioBook[]

  constructor(private router: Router){}

  ngOnInit(){
    this.audioBooksCategory = this.audioBooks.filter((book)=> {
      return book.category.id == this.category.id
    })
  }

  navigate(){
    this.router.navigate(['dashboard/library/category', this.category.name])
  }
}
