import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SharedAudioService } from 'src/app/config/shared-audio.service';
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

  constructor( private _sharedAudioService: SharedAudioService, private _fileService: FileService){}
  
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
    this._sharedAudioService.emitChange(audioBook)
  }
}
