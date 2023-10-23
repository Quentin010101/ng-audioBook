import { Component } from '@angular/core';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { AudioBookService } from 'src/app/service/audio-book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  audioBooks!: AudioBook[]

  constructor(private _audioBookService: AudioBookService){}

  ngOnInit(){
    this._audioBookService.getAllAudioBook().subscribe({
      next: (data) => this.audioBooks = data
    })
  }
}
