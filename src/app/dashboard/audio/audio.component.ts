import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AudioBook } from 'src/app/model/book/AudioBookModel';


@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  @Input() audioBook!: AudioBook;
  @ViewChild("btn") buttonRef!: ElementRef

  player!: HTMLMediaElement
  progress!: HTMLElement
  isPlaying: boolean = false
  isReady: boolean = false
  isPlayable: boolean = false
  timePassed: number = 0
  duration!: number 

  // conf
  forwardValue: number = 10

  ngOnInit(){
    this.player = new Audio('http://localhost:8090/files/audio/read/' + this.audioBook.audioFile.id + "?Authorization=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxQGdtYWlsLmNvbSIsImV4cCI6MTcwMDU4NjE3NiwiaWF0IjoxNzAwNTgzMTc2fQ.zcYtNyPd5HXqeHisXQBHXILlpVmALU-B7d4qRjAFJumzvow7nmYJPgSa77SpDqWc345m2R44bO8lDpyx_OcL-Q")
    this.player.setAttribute("preload", 'metadata')
    this.player.volume = 0.5
    this.setEventListener()
  }

  setEventListener(){
    this.player.addEventListener('timeupdate', this.currentTimeUpdate.bind(this))
    this.player.addEventListener('loadedmetadata', this.init.bind(this))
    this.player.addEventListener('playing', this.playing.bind(this))
    this.player.addEventListener('pause', this.paused.bind(this))
    this.player.addEventListener('stop', this.stop.bind(this))
    this.player.addEventListener('waiting', this.waiting.bind(this))
    this.player.addEventListener('canplay', this.canplay.bind(this))
  }
  waiting(){
    this.isPlayable= false
  }
  canplay(){
    this.isPlayable = true
  }
  playing(){
    this.isPlaying = true
  }
  paused(){
    this.isPlaying = false
  }
  stop(){
    this.isPlaying = false
  }

  init(){
    this.isReady = true
    this.duration = this.player.duration
  }

  playStop(e: Event){
    this.isPlaying? this.player.pause() : this.player.play()
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
    console.log(value)
    this.player.currentTime = Math.floor((this.duration*value)/100)
    this.timePassed = (this.duration*value)/100
  }
  setNewRange(value: number){
    this.player.volume = value/100
  }
}
