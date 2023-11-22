import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AudioBook } from '../model/book/AudioBookModel';
import { FileService } from './file.service';
import { State } from '../model/file/StateModel';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  $audio = new Subject<AudioBook>()
  $stateSubject = new Subject<State>()
  state: State = new State()
  player: HTMLAudioElement = new Audio()

  constructor(private _fileService: FileService) {
    this.$audio.subscribe({
      next: (data) => {
        this.initAudio(data.title)
        this.player.setAttribute('src', this._fileService.getAudioSrc(data.audioFile.id))
      }
    })
    this.addEventListeners(this.player)
   }

   initAudio(title: string){
    this.state.init = false
    this.state.title = title
    this.state.currentTime = 0
    this.state.playing = false
    this.state.paused = false
    this.state.canPlay = false
   }
  addEventListeners(player: HTMLAudioElement){
    player.addEventListener('loadedmetadata', this.init.bind(this))
    player.addEventListener('timeupdate', this.currentTimeUpdate.bind(this))
    player.addEventListener('playing', this.playing.bind(this))
    player.addEventListener('pause', this.paused.bind(this))
    // player.addEventListener('waiting', this.waiting.bind(this))
    player.addEventListener('canplay', this.canplay.bind(this))
  }
  init(){
    this.state.init = true
    this.state.duration = this.player.duration
    this.$stateSubject.next(this.state)
  }
  playing(){
    this.state.playing = true
    this.state.paused = false
    this.player.play()
    this.updateChildComp()
  }
  paused(){
    this.state.playing = false
    this.state.paused = true
    this.player.pause()
    this.updateChildComp()
  }
  canplay(){
    this.state.canPlay = true
    this.updateChildComp()
  }
  currentTimeUpdate(){
    this.state.currentTime = this.player.currentTime
    this.updateChildComp()
  }

  updateChildComp(){
    this.$stateSubject.next(this.state)
  }

  fastForward(){
    this.state.currentTime = this.setTimeFormat(this.state.currentTime + 20)
    this.player.currentTime = this.state.currentTime
  }
  fastBackward(){
    this.state.currentTime = this.setTimeFormat(this.state.currentTime - 20)
    this.player.currentTime = this.state.currentTime
  }
  setNewCurrentTime(percent: number){
    let percentage = percent/100
    let newTime = this.setTimeFormat(this.state.duration*percentage)
    console.log(newTime)
    this.state.currentTime = newTime
    this.player.currentTime = newTime
  }
  setNewVolume(vol: number){
    this.state.volume = vol/100
    this.player.volume = vol/100
  }

  setTimeFormat(number: number): number {
    return Math.floor(number*1000)/1000
  }

}
