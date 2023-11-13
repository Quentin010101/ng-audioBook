import { Component } from '@angular/core';
import { AudioBook } from '../model/book/AudioBookModel';
import { SharedAudioService } from '../config/shared-audio.service';
import { ActivatedRoute, Route, Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  audioBook!: AudioBook
  children!: Routes

  constructor(private _sharedAudioService: SharedAudioService, private route: ActivatedRoute) {
    _sharedAudioService.changeEmitted$.subscribe(data => {
        this.setAudioBook(data)
    });

  }

  ngOnInit(){
    this.children = (this.route.routeConfig?.children as Routes)
 
  }

  setAudioBook(audio: AudioBook){
    this.audioBook = audio
  }
}
