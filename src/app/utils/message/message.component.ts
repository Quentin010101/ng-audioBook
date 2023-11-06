import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'src/app/model/MessageModel';
import { SharedAudioService } from 'src/app/service/shared-audio.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent{
  message!: Message | null
  timing: number = 4000
  rand!: number
  timeout!: any
  duration: string = ((this.timing - this.timing/10)/1000) + "s"

  constructor(private _sharedAudioService: SharedAudioService) {
    _sharedAudioService.messageEmitted$.subscribe(data => {
      this.rand = Math.random()
      clearTimeout(this.timeout)
      this.timeout = setTimeout(()=>{
          this.message = null
        }, this.timing)
        this.message = data
    });
  }

}
