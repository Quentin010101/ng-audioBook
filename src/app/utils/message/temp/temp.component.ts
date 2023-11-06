import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Message } from 'src/app/model/MessageModel';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss'],
  animations: [
    trigger('letsgo', [
      state('start', style({
        width: 0,
        backgroundColor: "{{color}}"
      }), {params : { color: "green" }}),
      state('end', style({
        width: '100%',
        backgroundColor: "{{color}}"
      }), {params : { color: "green" }}),
      transition('* => end', [
        animate("{{duration}} ease-out")
      ], {params : { color: "green" , duration: "1s"}})
    ])
  ]
})
export class TempComponent implements OnChanges  {
  @Input() message !: Message | null
  @Input() duration !: string
  @Input() rand!: number
  test: string = 'start'

  ngOnChanges(changes: any){
    console.log(this.message)
    this.test = 'start'
    setTimeout(()=>{
      this.test = 'end'
    }, 10)
  }
  
}
