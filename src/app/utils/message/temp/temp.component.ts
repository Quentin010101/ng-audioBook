import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss'],
  animations: [
    trigger('letsgo', [
      state('start', style({
        width: 0,
      })),
      state('end', style({
        width: '100%',
      })),
      transition('* => end', [
        animate('4.5s')
      ])
    ])
  ]
})
export class TempComponent {
  @Input() message !: string
  @Input() duration !: number
  @ViewChild('progress') progress!: ElementRef

}
