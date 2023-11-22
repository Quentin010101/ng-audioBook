import { Component, Input} from '@angular/core';
import { AudioBook } from 'src/app/model/book/AudioBookModel';
import { State } from 'src/app/model/file/StateModel';
import { AudioService } from 'src/app/service/audio.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent {
  @Input() audioBook!: AudioBook
  state: State = new State()




  constructor(private _audioService: AudioService){
    this._audioService.$stateSubject.subscribe({
      next: (data) => this.handleState(data)
    })
  }

  ngOnInit(){
    this._audioService.$audio.next(this.audioBook)
  }

  handleState(state: State){
    this.state = state
  }

  playStop(){
    if(this.state.playing){
      this._audioService.paused()
    }else{
      this._audioService.playing()
    }
  }
  playBack(){
    this._audioService.fastBackward()
  }
  playForward(){
    this._audioService.fastForward()
  }
  setNewCurrentTime(number: number){
    this._audioService.setNewCurrentTime(number)
  }
  setNewRange(number: number){
    this._audioService.setNewVolume(number)
  }
}
