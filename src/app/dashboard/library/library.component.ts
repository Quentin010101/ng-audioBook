import { Component } from '@angular/core';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { SharedAudioService } from 'src/app/service/shared-audio.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  audioBooks!: AudioBook[]

  constructor(private _audioBookService: AudioBookService, private _sharedAudioService: SharedAudioService){}

  ngOnInit(){
    this._audioBookService.getAllAudioBook().subscribe({
      next: (data) => this.audioBooks = data
    })
  }

  onClick(audioBook: AudioBook){
    this._sharedAudioService.emitChange(audioBook)
  }
}
