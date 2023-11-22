import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBookComponent {
  @Input() audioBook!: AudioBook
  src!: string;

  constructor(  private _fileService: FileService , private router: Router){}
  
  ngOnInit(){
    this._fileService.getImage(this.audioBook.imageFile.id).subscribe({
      next: (data) => {
        let url = window.URL
        this.src = url.createObjectURL(data)
      },
      error: (data) =>{
        this.src = "/assets/image/default_book.avif"
      }
    })
  }

  onClick(audioBook: AudioBook){
    this.router.navigate(['dashboard/library/single'])
  }
}
