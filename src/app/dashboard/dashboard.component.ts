import { Component } from '@angular/core';
import { AudioBook } from '../model/book/AudioBookModel';
import { SharedAudioService } from '../config/shared-audio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  audioBook!: AudioBook

  constructor(private _sharedAudioService: SharedAudioService) {
    _sharedAudioService.changeEmitted$.subscribe(data => {
        this.setAudioBook(data)
    });
  }

  setAudioBook(audio: AudioBook){
    this.audioBook = audio
  }
}
