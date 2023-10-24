import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { environment } from 'src/environment';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements AfterViewInit{
  @Input() audioBook!: AudioBook;
  @ViewChild("player") playerRef!: ElementRef
  @ViewChild("progress") progressRef!: ElementRef
  @ViewChild("btn") buttonRef!: ElementRef
  player!: HTMLMediaElement
  progress!: HTMLElement
  isPlaying: boolean = false
  currentTime: number = 0
  rangeValue: number = 0

  audioInit: boolean = false
  updateRange: boolean = true

  // Timer

  // Display
  currentTimeDisplay: string = ''
  durationDisplay: string = ''
  
  // conf
  forwardValue: number = 10

  ngAfterViewInit(): void {
    this.playerRef.nativeElement.setAttribute("src", environment.apiUrl + '/file/' + this.audioBook.id)
    this.playerRef.nativeElement.addEventListener('loadedmetadata', this.init.bind(this))
    this.playerRef.nativeElement.addEventListener('timeupdate', this.currentTimeUpdate.bind(this))
    this.progressRef.nativeElement.addEventListener('input', this.newRangeInput.bind(this))
    this.progressRef.nativeElement.addEventListener('change', this.newRangeChange.bind(this))
  }

  init(){
    this.audioInit = true
    this.player = this.playerRef.nativeElement
    this.progress = this.progressRef.nativeElement
    this.durationDisplay = this.genereReadingTime(this.player.duration)
    this.initProgress(this.progress, this.player)
    
  }

  initProgress(p: HTMLElement, m:HTMLMediaElement){
    p.setAttribute('max', m.duration.toString()) 
    p.setAttribute('min', this.rangeValue.toString()) 
  }

  currentTimeUpdate(){
    this.currentTime = this.player.currentTime
    if(this.updateRange){
      this.currentTimeDisplay = this.genereReadingTime(this.player.currentTime)
    }
  }

  playStop(){
    if(this.isPlaying){
      this.player.pause()
    }else{
      this.player.play()
    }
    this.isPlaying = !this.isPlaying
  }

  playForward(){
    let timeForward = this.player.currentTime + this.forwardValue
    let duration = this.player.duration

    if(timeForward < duration){
      this.player.currentTime = timeForward
    }else{
      this.player.currentTime = duration
    }
  }

  playBack(){
    let timeBack = this.player.currentTime - this.forwardValue

    if(timeBack > 0){
      this.player.currentTime = timeBack
    }else{
      this.player.currentTime = 0
    }
  }

  genereReadingTime(n:number): string{
      const milisecondes = Math.floor(n*1000)
      const date = new Date(milisecondes)
      return date.toISOString().slice(11, 19)
  }

  newRangeInput(e: Event){
    this.updateRange = false

  }
  newRangeChange(e: Event){
    console.log("rangeValue1: " + this.rangeValue)
    this.updateRange = true
    this.rangeValue = parseInt((e.target as HTMLInputElement)?.value)
    console.log("rangeValue2: " + this.rangeValue)
    this.player.currentTime = this.rangeValue
    console.log("currenttime: " + this.currentTime)
  }

}
