import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { State } from 'src/app/model/file/StateModel';
import { AudioService } from 'src/app/service/audio.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements AfterViewInit{

  @Output() timeEvent = new EventEmitter<number>();

  @ViewChild("avancement") avancementRef!: ElementRef
  avancement!: HTMLInputElement
  @ViewChild("bar") barRef!: ElementRef
  state: State = new State()
  bar!: HTMLInputElement
  componentInit: boolean = false
  durationString!: string | null
  timePassedString!: string | null

  constructor(private _audioService: AudioService){
    this._audioService.$stateSubject.subscribe({
      next: (data) => this.handleState(data)
    })
  }  
  
  handleState(state: State){
    this.state = state
    this.updateAvancementBar()
    this.timePassedString = this.genereReadingTime(this.state.currentTime)
    this.durationString = this.genereReadingTime(this.state.duration)
  }

  ngAfterViewInit(): void {
    this.avancement = this.avancementRef.nativeElement
    this.bar = this.barRef.nativeElement
    this.componentInit = true
  }


  updateAvancementBar(){
    let percent = Math.floor((this.state.currentTime*100)*100/this.state.duration)/100
    this.avancement.style.width = percent + "%"
  }

  genereReadingTime(n:number): string{
    const milisecondes = Math.floor(n*1000)
    const date = new Date(milisecondes)
    return  date.toISOString().slice(11, 19)
  }

onClick(e: MouseEvent){
  e.stopPropagation()
  const object = this.bar.getBoundingClientRect()
  const x = e.clientX - object.left 
  const per = Math.floor(x*10000/object.width)/100
  this.timeEvent.emit(per)
}
}
