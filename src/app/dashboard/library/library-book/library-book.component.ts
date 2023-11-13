import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { FileService } from 'src/app/service/file.service';
import { SharedAudioService } from 'src/app/config/shared-audio.service';

@Component({
  selector: 'app-library-book',
  templateUrl: './library-book.component.html',
  styleUrls: ['./library-book.component.scss']
})
export class LibraryBookComponent {
  @Input() audioBook!: AudioBook
  @ViewChild('img') image!: ElementRef

  constructor( private _sharedAudioService: SharedAudioService, private _fileService: FileService){}
  
  ngAfterViewInit(){
    this._fileService.getImage(this.audioBook.imageFile.id).subscribe({
      next: (data) => {
        let url = window.URL
        this.image.nativeElement.src = url.createObjectURL(data)
      }
    })
  }

  onClick(audioBook: AudioBook){
    this._sharedAudioService.emitChange(audioBook)
  }
}
