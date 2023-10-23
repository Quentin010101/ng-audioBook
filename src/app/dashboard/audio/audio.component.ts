import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { AudioBook } from 'src/app/model/AudioBookModel';
import { environment } from 'src/environment';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements AfterViewInit{
  @Input() audioBook!: AudioBook;
  @ViewChild("player") player!: HTMLMediaElement

  ngOnInit(){
    
  }

  ngAfterViewInit(): void {
    this.player.setAttribute("src", environment.apiUrl + '/file/' + this.audioBook.id)
  }
}
