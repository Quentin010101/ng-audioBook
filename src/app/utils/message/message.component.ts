import { Component } from '@angular/core';
import { SharedAudioService } from 'src/app/service/shared-audio.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  message!: string | null
  timing: number = 5000

  constructor(private _sharedAudioService: SharedAudioService) {
    _sharedAudioService.messageEmitted$.subscribe(data => {
        this.message = data
        setTimeout(() => {
          this.message = null
        }, this.timing)
    });
  }
}
