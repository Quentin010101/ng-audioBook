import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from 'src/app/model/MessageModel';
import { SharedAudioService } from 'src/app/service/shared-audio.service';
import { Temp2Component } from './temp2/temp2.component';
import { MessageDuration } from 'src/app/model/MessageDurationModel';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent{
  duration: number = 4000

  constructor(private _sharedAudioService: SharedAudioService, private _snackBar: MatSnackBar) {
    _sharedAudioService.messageEmitted$.subscribe(data => {
        this.openSnackBar(data)
    });
  }

  openSnackBar(message: Message) {
    this._snackBar.openFromComponent(Temp2Component, {
      duration: this.duration,
      data: new MessageDuration(message, this.duration)
    });
  }

}
