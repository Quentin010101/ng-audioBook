import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-library-category-single',
  templateUrl: './library-category-single.component.html',
  styleUrls: ['./library-category-single.component.scss']
})
export class LibraryCategorySingleComponent {
  exist: boolean = false
  category!: string | null
  audioBooksCat!: AudioBook[] | null

  constructor(private route: ActivatedRoute, private _categoryService: CategoryService, private _audioBookService: AudioBookService){}

  ngOnInit(){
    let catUrl = this.route.snapshot.paramMap.get("category") as string
    this._categoryService.getAll().subscribe({
      next: (data) => {
        this.category = catUrl
        data.forEach((cat)=>{
          if(cat.name == catUrl) this.exist = true
        })
        if(this.exist){
          this._audioBookService.getAllAudioBook().subscribe({
            next: (data) => {
              this.audioBooksCat = data.filter(book => {
                return book.category.name = this.category as string
              } )
            }
          })
        }
      }
    })
    
  }
}
