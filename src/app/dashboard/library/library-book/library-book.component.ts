import { Component, Input } from '@angular/core';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { SharedAudioService } from 'src/app/service/shared-audio.service';

@Component({
  selector: 'app-library-book',
  templateUrl: './library-book.component.html',
  styleUrls: ['./library-book.component.scss']
})
export class LibraryBookComponent {
  @Input() audioBook!: AudioBook

  constructor( private _sharedAudioService: SharedAudioService){}
  
  onClick(audioBook: AudioBook){
    this._sharedAudioService.emitChange(audioBook)
  }
}
