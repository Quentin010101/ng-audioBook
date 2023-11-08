import { Component } from '@angular/core';
import { SharedAudioService } from './service/shared-audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkMode: boolean = true

  constructor(private _sharedAudioService: SharedAudioService){
    _sharedAudioService.themeEmitted$.subscribe({
      next: (data) => {
        this.isDarkMode = !this.isDarkMode
      }
    })
  }
}
