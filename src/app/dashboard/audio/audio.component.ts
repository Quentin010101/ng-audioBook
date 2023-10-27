import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { AudioBookService } from 'src/app/service/audio-book.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements AfterViewInit{
  @Input() audioBook!: AudioBook;
  @ViewChild("player") playerRef!: ElementRef
  @ViewChild("btn") buttonRef!: ElementRef

  player!: HTMLMediaElement
  progress!: HTMLElement
  isPlaying: boolean = false
  audioInit: boolean = false
  timePassed: number = 0
  duration!: number 

  // conf
  forwardValue: number = 10

  constructor(private _bookService: AudioBookService){

  }

  ngAfterViewInit(): void {
    this.initSrcAudioPlayer()
    this.playerRef.nativeElement.addEventListener('loadedmetadata', this.init.bind(this))
    this.playerRef.nativeElement.addEventListener('timeupdate', this.currentTimeUpdate.bind(this))
    this.playerRef.nativeElement.addEventListener('canplay', this.canplay.bind(this))
  }

  initSrcAudioPlayer(){
    this.playerRef.nativeElement.setAttribute("preload", 'metadata')
    this.playerRef.nativeElement.setAttribute("src", 'http://localhost:8090/file/1')
    // this._bookService.getFile().subscribe({
    //   next: (data) => {
    //     console.log('data: ' + data)
    //   }
    // })
  }
  canplay(){
    console.log('play')
  }
  init(){
    this.audioInit = true
    this.player = this.playerRef.nativeElement
    this.duration = this.player.duration
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

  currentTimeUpdate(){
    this.timePassed = this.player.currentTime
  }

  setNewCurrentTime(value: number){
    console.log('value currentTime: ' + (this.duration*value)/100)
    // this.player.currentTime = (this.duration*value)/100
    // this.timePassed = (this.duration*value)/100
  }
}
