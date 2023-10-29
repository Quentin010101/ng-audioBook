import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements AfterViewInit, OnChanges{
  @Input() timePassed!: number 
  @Input() duration!: number

  @Output() timeEvent = new EventEmitter<number>();

  @ViewChild("avancement") avancementRef!: ElementRef
  avancement!: HTMLInputElement
  @ViewChild("bar") barRef!: ElementRef
  bar!: HTMLInputElement
  componentInit: boolean = false


  ngAfterViewInit(): void {
    this.avancement = this.avancementRef.nativeElement
    this.bar = this.barRef.nativeElement
    this.componentInit = true
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['timePassed'].currentValue != null && this.componentInit){
      this.updateAvancementBar()
    }
  }

  updateAvancementBar(){
    let percent = Math.floor((this.timePassed*100)*100/this.duration)/100
    this.avancement.style.width = percent + "%"
  }

  genereReadingTime(n:number): string{
    const milisecondes = Math.floor(n*1000)
    const date = new Date(milisecondes)
    return date.toISOString().slice(11, 19)
  }

onClick(e: MouseEvent){
  e.stopPropagation()
  const object = this.bar.getBoundingClientRect()
  const x = e.clientX - object.left 
  const per = Math.floor(x*10000/object.width)/100
  this.timeEvent.emit(per)
}

onInput(){

}



}
