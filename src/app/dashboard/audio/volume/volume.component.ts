import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent {
  @Output() rangeEvent = new EventEmitter<number>
  @Input() isPlayable: boolean = false
  volume: number = 50

  onChange(e: Event){
    let value: string = (e.target as HTMLInputElement).value
    this.volume = parseInt(value)
    console.log(this.volume)
    this.rangeEvent.emit(parseInt(value))
  }
}
