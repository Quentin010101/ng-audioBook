import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MessageDuration } from 'src/app/model/message/MessageDurationModel';
import { Message } from 'src/app/model/message/MessageModel';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-temp2',
  templateUrl: './temp2.component.html',
  styleUrls: ['./temp2.component.scss'],
  animations: [
    trigger('letsgo', [
      state('start', style({
        width: 0,
      })),
      state('end', style({
        width: '100%',
      })),
      transition('start => end', [
        animate("{{duration}}s ease-out")
      ], {params : { duration: "1s"}})
    ])
  ]
})
export class Temp2Component {
  message!: Message
  duration!: number
  animations: string = 'start'
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: MessageDuration) {
    this.message = data.message
    this.duration = data.duration/1000
   }

   ngOnChange(changes: any){
    console.log("change")
   }
   ngOnInit(){
    setTimeout(()=>{
      this.animations = 'end'
    }, 10)
   }
}
