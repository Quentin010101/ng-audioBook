import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements AfterViewInit, OnChanges{
  @Input() timePassed!: number 
  @Input() duration!: number

  @Output() timeEvent = new EventEmitter<string>();

  @ViewChild("progress") progressRef!: ElementRef
  progress!: HTMLInputElement
  progressLoaded: boolean = false

  ngAfterViewInit(): void {
    this.progress = this.progressRef.nativeElement
    this.initProgressBar()
    this.progress.addEventListener('change', this.onChange.bind(this))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['timePassed'] != null && this.progressLoaded){
      console.log("in")
      this.progress.setAttribute('value', Math.floor(changes['timePassed'].currentValue).toString())
    }
  }

  initProgressBar(){
    this.progressLoaded = true
    console.log('duration : ' + this.duration)
    this.progress.setAttribute('max', this.duration.toString())
    this.progress.setAttribute('min', "0")
    this.progress.setAttribute('value', "0")
  }

  genereReadingTime(n:number): string{
    const milisecondes = Math.floor(n*1000)
    const date = new Date(milisecondes)
    return date.toISOString().slice(11, 19)
  }

onChange(e: Event){
  const value = (e.target as HTMLInputElement)?.value
  this.timeEvent.emit(value)
}

onInput(){

}



}
